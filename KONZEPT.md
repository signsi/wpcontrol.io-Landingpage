# WPorbit – Produkt- und Marketingkonzept

## Produkt

**WPorbit** ist ein Desktop-Workspace für WordPress-Agenturen, der den gesamten Lifecycle eines WordPress-Projekts abdeckt – von der lokalen Entwicklung bis zur laufenden Wartung.

### Kern-Versprechen
> „Vom Setup bis zur Wartung. Ein Cockpit."

Ein einziges Tool ersetzt den fragmentierten Stack aus lokalen Entwicklungstools, FTP-Clients, Passwort-Spreadsheets, Monitoring-Dashboards und manuellen Update-Routinen.

### Tonalität & Sprache
- **Entscheider-first:** Die LP spricht Inhaberinnen und Projektverantwortliche an, nicht Entwickler:innen
- **Weniger Technik-Jargon** auf der LP (kein Docker, NGINX, PHP-Versions-Talk im Hero)
- **Nutzen statt Feature:** „Kein Durchsuchen von Tabellen nach Zugangsdaten" statt „Vault-System"
- **Demo überzeugt Entwickler:innen** – technische Tiefe gehört in die App, nicht auf die LP

### Zielgruppe
- **Primär:** WordPress-Agenturen mit laufenden Kundenprojekten (3–15+ Personen)
- **Sekundär:** Kleinere Teams, die lokal entwickeln und mit mehreren Hostern arbeiten

---

## Feature-Set

| Bereich | Beschreibung |
|---|---|
| **Lokale Entwicklung** | WordPress-Umgebungen ohne Docker, NGINX oder Apache – bereit in Sekunden, isoliert, reproduzierbar (PHP-Version, Datenbank, Konfig pro Projekt) |
| **Staging & Preview** | Isolierte Staging-Umgebungen; Preview-Links mit Kunden teilen, ohne zu veröffentlichen; jederzeit zurücksetzbar |
| **Selektive Synchronisierung** | Granulare Kontrolle: einzelnes Theme, Plugin, Datenbank oder gesamtes wp-content zwischen Lokal, Staging und Produktion |
| **Deploy via GitLab / GitHub** | Pipeline-basiertes Deployment; vorgefertigte Vorlagen für GitLab; jeder Deploy reproduzierbar und rückgängig machbar |
| **Import / Migration** | Direkter Import aus Live-Installation via SSH, inkl. Theme-Repo |
| **Monitoring & Alerts** | Automatisiertes Uptime-, Security- und Performance-Monitoring |
| **Vault & Zugänge** | Zentrale, verschlüsselte Zugangsdatenverwaltung (Hosting: Schweiz, DSGVO-konform); kein Copy-Paste in Chats oder Slack |
| **Updates & Wartung** | Core-, Plugin- und Theme-Updates gegen Staging testen; Rollback auf Knopfdruck |
| **KI-Integration** | Claude, ChatGPT, Copilot heute via VS-Code-Integration nutzbar; native UI in Entwicklung |

---

## Positionierung

### Direktvergleich

| Kriterium | WPorbit | Local WP | Studio (WordPress.com) |
|---|---|---|---|
| Lokale Entwicklung | ✓ Integriert | ✓ Ja | ✓ Ja |
| Preview & Sync | ✓ Integriert | ✓ Ja | ✓ Ja |
| Hosting-Flexibilität | **Freie Wahl** | Starke Bindung an WP Engine | Starke Bindung an WordPress.com |
| Kunden- & Projektverwaltung | **Zentral** | Nicht ausgelegt | Nicht ausgelegt |
| Team-Vault | **Geteilter Vault** | Nicht integriert | Nicht integriert |
| Agentur-Workflows (Entwicklung, Deploy, Wartung) | **Alles in einer Plattform** | Fokus Entwicklung | Fokus Entwicklung |
| KI-Unterstützung | Claude, ChatGPT, Copilot (nativ in Entwicklung) | Nicht integriert | Integriert |
| Teamzusammenarbeit | **Geteilte Standards, Zugänge, Projekte** | Entwickler-Workflows | Entwickler-Workflows |
| Ideal für | **Agenturen & WordPress-Teams** | Einzelentwickler | WordPress.com-Ökosystem |

### USPs
1. **Kein Hoster-Lock-in** – Agenturen arbeiten mit cyon, Infomaniak, Raidboxes, Hostinger, Kinsta, Metanet, Hostpoint u.v.m.
2. **Volle Abdeckung** – einzige Plattform, die Entwicklung, Deployment, Monitoring und Wartung vereint
3. **Team-first** – gemeinsame Zugänge, Standards und Projekte für das gesamte Agentur-Team
4. **Swiss Hosting** – Vault-Daten in der Schweiz, DSGVO-konform

---

## Pricing-Modell

### Demo-Trial — kostenlos
- **10 Tage**, voller Funktionsumfang
- 1 Projekt
- Nur E-Mail-Adresse, keine Kreditkarte
- Direkter App-Download
- *Einsteigen ohne Risiko – für Entscheider und Teams gleichermassen*

### Standalone — ab 40 CHF / Person / Monat
- Max. 3 Projekte
- Lokale Entwicklungsumgebung
- Vault für Zugangsdaten
- Deploy- und Pull-Prozesse
- *Für Agenturen, die lokal starten wollen*

### Cloud — ab 1 200 CHF / Monat *(Empfohlen)*
- 3 Personen inkl. Cloud Portal für das gesamte Team
- Staging und Preview
- Monitoring und Update-Planung
- Vault-Synchronisation
- Projekte und Zugänge zentral verwalten
- Wartungsplanung im Dashboard

### Custom — Auf Anfrage
- Alles aus Cloud
- CRM- und ERP-Integrationen
- Custom Workflows und Prozesse
- Eigene Abfragen und Automatisierungen
- Dedizierter Support
- *Agenturspezifische Erweiterungen nach Mass*

---

## Go-to-Market & Marketing

### Zwei-Stufen-Modell: LP begeistert Entscheider – Demo überzeugt Entwickler:innen

Die Landing Page spricht **Agenturinhaberinnen und Projektverantwortliche** an. Sie beantwortet: „Was kostet mich der Status quo?" und „Was gewinne ich?". Technische Details gehören in die Demo-Erfahrung.

**Entscheider-Messaging (LP):**
- Weniger Zeit mit Setup, Updates und Zugangschaos
- Fehler und Stolperfallen werden automatisch abgefangen → weniger Ärger, weniger Nacharbeit
- Mehr Kapazität für Kundenprojekte statt Verwaltung
- Kein Hoster-Wechsel nötig

**Entwickler:innen-Messaging (Demo / App):**
- CLI-Workflow, Staging-Details, Pipeline-Konfiguration
- Technische Tiefe, konkrete Kommandos, Integrationsdetails

### Demo-Trial (primäres CTA)
- **10 Tage kostenlos**, voller Funktionsumfang, 1 Projekt
- Nur E-Mail-Adresse – **keine Kreditkarte**
- Direkter App-Download → sofortiger Start ohne Onboarding-Hürde
- Reibung minimieren: E-Mail eingeben → Download starten → loslegen

### Messaging-Hierarchie
1. **Problem:** fragmentierte Tool-Landschaft kostet Agenturen Zeit, Geld und Nerven
2. **Lösung:** ein Cockpit, das Entlastung bringt – ohne Hoster-Wechsel
3. **Einstieg:** 10 Tage gratis, kein Risiko, voller Umfang
4. **Vertrauen:** Swiss Hosting, DSGVO, kein Lock-in, jederzeit kündbar

### Content-Hebel
- ROI- und Migrations-Checkliste (Incentive nach Demo-Signup)
- FAQ als SEO-Asset (Einwände direkt auf der LP entkräften)

---

## Einwände und Antworten (FAQ-Basis)

| Einwand | Antwort |
|---|---|
| Ich brauche keinen Cloud-Sync | Standalone-Modus möglich; Cloud später aktivierbar |
| Wir sind an einen bestimmten Hoster gebunden | WPorbit arbeitet mit jedem Hoster |
| Was ist mit Update-Risiken? | Staging-Test vor jedem Update, Rollback auf Knopfdruck |
| Welche Integrationen gibt es zum Start? | GitLab mit vorgefertigten Templates; GitHub analog |
| Was passiert nach der Anmeldung? | Sofortiger Zugang zur Checkliste + aktive Feature-Mitgestaltung |

---

## Technisches Profil

- **Desktop-App** (macOS, impliziert durch Swift-Komponenten im Repo)
- **CLI-Interface**: `wporbit env:start <projektname>`
- **VS-Code-Integration** für KI-Workflows
- **Design System**: Chakra Petch, Hanken Grotesk, Space Mono; eigenes Token-System (WPorbit Color, Gradient, Typography)
- **Lokale Umgebungen:** PHP 8.x, isolierte Datenbank, kein Docker erforderlich
