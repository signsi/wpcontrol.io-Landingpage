<?php
/**
 * Kontakt- und Newsletter-Formular der Website: schickt jede Anfrage per Mail.
 *
 * Liegt nach dem Build unter dist/api/form.php und läuft auf dem normalen
 * PHP-Webhosting. Keine Datenbank, keine Bibliothek: PHP mail() mit dem
 * Mailserver des Hostings.
 *
 * Einstellungen: die drei Konstanten unten.
 */

const TO = 'hallo@wporbit.ch';
// Absender muss eine Adresse der eigenen Domain sein, sonst landen die Mails
// wegen SPF im Spam oder werden abgelehnt.
const FROM = 'noreply@wporbit.ch';
const ALLOWED_ORIGINS = ['https://wporbit.ch', 'https://www.wporbit.ch'];

const RATE_LIMIT = 5;        // Anfragen …
const RATE_WINDOW = 600;     // … pro 10 Minuten und IP-Adresse

date_default_timezone_set('Europe/Zurich');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, bool $ok, string $error = ''): void {
    http_response_code($status);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

/** Eine Zeile für Mail-Kopfzeilen: ohne Zeilenumbrüche, gekürzt. */
function line(string $value, int $max = 200): string {
    return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', $value)), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, false, 'method');
}

// Nur Anfragen von der eigenen Website. Fehlt der Origin (ältere Browser),
// genügt die übrige Prüfung.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
    reply(403, false, 'origin');
}

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    reply(400, false, 'body');
}

$kind = $data['kind'] ?? '';
if (!in_array($kind, ['kontakt', 'newsletter'], true)) {
    reply(400, false, 'kind');
}

// Honeypot: Menschen füllen das Feld nie aus. Der Bot bekommt „ok“ und
// erfährt nichts über den Filter.
if (trim((string)($data['website'] ?? '')) !== '') {
    reply(200, true);
}

$email = line((string)($data['email'] ?? ''), 254);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(422, false, 'email');
}

// Einfache Begrenzung pro IP-Adresse, in einer Datei im Temp-Ordner.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/wporbit-form-' . hash('sha256', $ip);
$now = time();
$hits = array_filter(
    array_map('intval', @file($bucket, FILE_IGNORE_NEW_LINES) ?: []),
    fn($t) => $t > $now - RATE_WINDOW
);
if (count($hits) >= RATE_LIMIT) {
    reply(429, false, 'rate');
}
$hits[] = $now;
@file_put_contents($bucket, implode("\n", $hits), LOCK_EX);

if ($kind === 'kontakt') {
    $name = line((string)($data['name'] ?? ''), 120);
    $agency = line((string)($data['agentur'] ?? ''), 160);
    $topic = line((string)($data['thema'] ?? ''), 120);
    $message = mb_substr(trim((string)($data['nachricht'] ?? '')), 0, 8000);
    if ($name === '' || $message === '') {
        reply(422, false, 'fields');
    }
    $subject = 'Kontakt: ' . ($topic !== '' ? $topic : 'Anfrage') . ' von ' . $name;
    $body = "Neue Anfrage über das Kontaktformular auf wporbit.ch\n\n"
        . "Name:     $name\n"
        . "E-Mail:   $email\n"
        . ($agency !== '' ? "Agentur:  $agency\n" : '')
        . ($topic !== '' ? "Thema:    $topic\n" : '')
        . "\n$message\n";
    $replyTo = $name !== '' ? '"' . str_replace('"', '', $name) . "\" <$email>" : $email;
} else {
    $subject = 'Newsletter: neue Anmeldung';
    $body = "Neue Newsletter-Anmeldung auf wporbit.ch\n\n"
        . "E-Mail: $email\n"
        . 'Zeit:   ' . date('d.m.Y H:i') . "\n\n"
        . "Hinweis: Vor dem ersten Versand die Zustimmung bestätigen lassen (Double-Opt-in).\n";
    $replyTo = $email;
}

$body .= "\n—\nIP: $ip · " . line($_SERVER['HTTP_USER_AGENT'] ?? '', 160) . "\n";

$headers = [
    'From: WPorbit Website <' . FROM . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: wporbit.ch',
];

$sent = mail(
    TO,
    '=?UTF-8?B?' . base64_encode(line($subject)) . '?=',
    $body,
    implode("\r\n", $headers),
    '-f' . FROM
);

$sent ? reply(200, true) : reply(500, false, 'mail');
