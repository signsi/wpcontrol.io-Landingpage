# WPorbit — Corporate Design System

Stand: Juli 2026 · Basis für Web (bestehende Landingpage) und die native Umsetzung in Xcode/Swift.

Das Logo bleibt unverändert. Das CI baut auf einem dunklen Grundton ("Deep Space") auf und erzählt das Orbit/Space-Thema über zwei eigene Farbverläufe, ein wiederkehrendes Set grafischer Motive (Orbit-Linien, Sternenfeld, Planet-Punkt) sowie eine bewusst unübliche Schriftkombination.

## 1. Logo

Das bestehende Logo (Kreis + offener Orbit-Bogen, Wortmarke "WPorbit") wird als `currentColor`-Asset behandelt: einfarbig, passt sich per Farbwert dem Hintergrund an. Datei: `Assets/logo.svg`.

- Standard: auf dunklem Hintergrund, Farbe Starlight (`#F4F5F9`)
- Sekundär: auf hellem Hintergrund, Farbe Deep Space (`#07080D`)
- Schutzraum: mindestens die Höhe des Orbit-Kreises auf allen Seiten frei lassen
- Keine Verzerrung, keine Neufarbigkeit ausserhalb der Palette, keine Effekte (Schlagschatten, Bevel) auf dem Logo selbst

## 2. Farbpalette

| Token | Hex | Verwendung |
|---|---|---|
| Deep Space | `#07080D` | Basis-Hintergrund |
| Surface | `#0E1019` | Karten, Panels, Tiles |
| Elevated | `#151827` | hervorgehobene Karten |
| Orbit Line | `#282C40` | Rahmen, Linien-Motiv |
| Border Soft | `#1A1D2C` | dezente Section-Trennlinien |
| Starlight | `#F4F5F9` | Primärtext |
| Text Secondary | `#C4C7D6` | Fliesstext, sekundär |
| Text Tertiary | `#8B8FA6` | Meta-Text, Labels |
| Solar | `#FF6A39` | primäre CTA-Farbe |
| Solar Flare | `#FF3D77` | Gradient-Ende, Hover |
| Nebula Violet | `#7B5CFA` | Orbit-Gradient, Glow |
| Orbit Cyan | `#2FD9EE` | Links, Status "aktiv" |
| Status Success | `#3DDC84` | Erfolgsmeldungen, Terminal-Output |

Regel: Deep Space/Surface/Elevated bilden immer die Basis. Solar wird sparsam eingesetzt (eine Haupt-Aktion pro Screen). Orbit-Farben (Violett/Cyan) übernehmen Struktur, Status und Deko.

## 3. Verläufe

- **Orbit Gradient** — `#7B5CFA → #2FD9EE`, horizontal. Für Struktur, Glow-Effekte, Gradient-Text, Chart-Akzente.
- **Solar Gradient** — `#FF6A39 → #FF3D77`, horizontal. Ausschliesslich für primäre Call-to-Actions.
- **Nebula Glow** — weicher, radialer Verlauf aus Nebula Violet/Orbit Cyan mit starkem Weichzeichner (Blur 40–60), als Hintergrund-Deko hinter Hero-/Header-Bereichen.

## 4. Typografie

| Rolle | Schrift | Gewichte |
|---|---|---|
| Headlines | Chakra Petch | Medium 500, SemiBold 600, Bold 700 |
| Fliesstext | Hanken Grotesk | Regular 400, Medium 500, SemiBold 600, Bold 700 |
| Code / Labels / Kicker | Space Mono | Regular 400, Bold 700 |

Begründung: Chakra Petch bringt mit seinen charakteristischen angeschrägten Ecken einen klaren Bezug zu Orbit-Telemetrie/HUD-Anzeigen und ist deutlich eigenständiger als verbreitete Tech-Groteske (z.B. Space Grotesk/Inter, die inzwischen Standard in vielen SaaS-Auftritten sind). Hanken Grotesk bleibt neutral und gut lesbar für längere Texte. Space Mono unterstreicht den "System/Terminal"-Ton, der zum Entwickler-Produkt passt.

### Skala

| Stil | Grösse | Schrift/Gewicht | Line-Height |
|---|---|---|---|
| Display (Hero) | 46–52 / 34 (App) | Chakra Petch SemiBold | 1.15 |
| H1 | 38 / 28 (App) | Chakra Petch SemiBold | 1.15 |
| H2 | 26 / 22 (App) | Chakra Petch SemiBold | 1.2 |
| H3 | 17–18 | Chakra Petch SemiBold | 1.3 |
| Body | 16 | Hanken Grotesk Regular | 1.5–1.6 |
| Caption/Kicker | 11–13 | Space Mono Regular, Uppercase, Tracking +1.2 | 1.3 |
| Code | 13 | Space Mono Regular | 1.5 |

## 5. Grafische Motive

- **Orbit-Ring** — dünne, offene Ellipsen-Bögen (1–1.5px) als Divider oder Deko-Element hinter Karten. Leicht rotiert, nie vollständig geschlossen.
- **Sternenfeld** — feine, unregelmässig verteilte Punkte (0.6–1.6px, Opazität 0.3–0.4) als Textur auf dunklen Flächen, v.a. Hero und grosse Section-Hintergründe.
- **Planet-Punkt** — Kreis (gefüllt, oft mit Solar- oder Orbit-Gradient) plus dünner Ring mit Abstand darum. Einsetzbar als Bullet-Point, Status-Indikator oder Icon-Rahmen anstelle generischer Stock-Icons.
- **Geschwungener Divider** — leicht wellenförmige Linie statt gerader Trennlinie zwischen Sections.

## 6. Komponenten

- **Buttons**: Primary (Solar-Gradient, dunkles Label, weicher Schatten), Secondary (Outline, Orbit-Line-Rahmen), Ghost (reiner Text-Link). Radius 10.
- **Pills/Badges**: Space Mono, Uppercase, Capsule-Rahmen. Varianten: neutral (Orbit Line), aktiv (Orbit Cyan), warnend (Solar).
- **Karten**: Radius 14–16, Surface- oder Elevated-Hintergrund, 1px Orbit-Line-Rahmen. Icon-Slot als Kreis mit Orbit-Gradient-Kern statt Flat-Icon.
- **Code-/Terminal-Block**: Space Mono, Deep-Space-Hintergrund, Orbit-Line-Rahmen, Status-Farben für Prompt (`$`), Verlauf (`→`, Orbit Cyan) und Erfolg (`✓`, Status Success).

## 7. Übertragung auf Xcode/Swift

Die native Umsetzung liegt unter `Swift/`:

- `Swift/Theme/WPorbitColor.swift` — alle Farbtoken als `Color`
- `Swift/Theme/WPorbitGradient.swift` — Orbit-/Solar-Gradient, Nebula-Glow
- `Swift/Theme/WPorbitTypography.swift` — Font-Helper + fertige Textstile (`.wpH1`, `.wpBody`, ...), `KickerText`
- `Swift/Components/OrbitRing.swift` — Orbit-Bogen, Orbit-Rahmen, geschwungener Divider als `Shape`
- `Swift/Components/Starfield.swift` — deterministisches Sternenfeld als `Canvas`
- `Swift/Components/PlanetDot.swift` — Planet-Punkt-Motiv
- `Swift/Components/WPorbitButtonStyle.swift` — `.wpPrimary`, `.wpSecondary`, `.wpGhost`
- `Swift/Components/Pill.swift` — Badge-Komponente
- `Swift/Components/WPorbitCard.swift` — Standard-Karte

Details zur Einbindung (Fonts, Xcode-Setup) siehe `README.md`, fertiger Umsetzungs-Prompt für einen Coding-Agenten in `Prompts/IMPLEMENTATION_PROMPT.md`.
