# Prompt: WPorbit Design-System in Xcode/Swift umsetzen

Kopiere den folgenden Block 1:1 in deinen Coding-Agenten (z.B. Claude Code, Cursor), während du dich im Xcode-Projekt-Verzeichnis befindest, in das du die Ordner `Swift/`, `Fonts/` und `Assets/` aus diesem Export bereits kopiert hast.

---

```
Kontext: Ich baue an einer SwiftUI-App für WPorbit (WordPress-Tooling für Agenturen).
Ich habe ein neues Corporate Design mit Orbit/Space-Thema definiert und bereits als
SwiftUI-Bausteine vorbereitet. Deine Aufgabe: dieses Design-System korrekt ins Projekt
einbinden und anhand einer Beispiel-Ansicht demonstrieren.

Bereits vorhanden (bitte einlesen, bevor du startest):
- DesignSystem.md — vollständige CI/CD-Spezifikation (Farben, Typografie, Motive, Komponenten)
- Swift/Theme/WPorbitColor.swift — Farbtoken
- Swift/Theme/WPorbitGradient.swift — Orbit-/Solar-Gradient, Nebula-Glow
- Swift/Theme/WPorbitTypography.swift — Font-Helper, Textstile (.wpH1, .wpBody, ...), KickerText
- Swift/Components/OrbitRing.swift, Starfield.swift, PlanetDot.swift — grafische Motive
- Swift/Components/WPorbitButtonStyle.swift, Pill.swift, WPorbitCard.swift — UI-Komponenten
- Fonts/*.ttf — Chakra Petch, Hanken Grotesk, Space Mono
- Assets/logo.svg — bestehendes Logo (nicht verändern)

Schritte:

1. Alle Dateien aus Swift/Theme und Swift/Components ins Xcode-Target übernehmen
   (falls noch nicht als Gruppe im Projekt-Navigator sichtbar, per "Add Files to..."
   hinzufügen statt neu zu erstellen — die Dateien existieren bereits im Projektordner).

2. Die 9 TTF-Dateien aus Fonts/ als Bundle-Resources einbinden und in der Info.plist
   unter dem Key "Fonts provided by application" (UIAppFonts) eintragen. Falls das
   Projekt SwiftPM-Ressourcen statt eines klassischen App-Targets nutzt, das
   projektspezifisch passende Vorgehen wählen und kurz erklären, welches du gewählt
   hast und warum.

3. Prüfen, dass die Fonts tatsächlich geladen werden (z.B. kurzer Debug-Check über
   UIFont.familyNames). Falls ein Font nicht gefunden wird: PostScript-Namen aus der
   Datei selbst auslesen und mit den Namen in WPorbitTypography.swift abgleichen,
   nicht blind Namen erraten.

4. Eine neue SwiftUI-View "WPorbitStyleGuidePreview" erstellen, die als lebender
   Showcase des Design-Systems dient (analog zum bestehenden HTML-Moodboard), mit:
   - Deep-Space-Hintergrund + Starfield-Overlay
   - Logo (aus Assets/logo.svg, als Image via SF Symbols-Alternative oder SVG-Import
     deiner Wahl — falls das Projekt kein SVG-Rendering hat, kurz Bescheid geben
     statt einfach ein PNG zu erzeugen)
   - Headline mit .wpDisplay / .wpH1, Fliesstext mit .wpBody
   - Primary-, Secondary-, OnDark- und Ghost-Button (.wpPrimary, .wpSecondary, .wpOnDark, .wpGhost)
   - Zwei bis drei Pills in unterschiedlichen Styles
   - Eine WPorbitCard mit PlanetDot-Icon-Slot
   - Ein OrbitRing als Deko-Element irgendwo im Layout

5. Sicherstellen, dass die View sowohl im Light- als auch im Dark-Mode-Preview des
   Systems konsistent aussieht (das CI ist bewusst dunkel — ggf. .preferredColorScheme
   auf der Preview setzen, damit es nicht vom System-Light-Mode überschrieben wird).

6. Kurz zusammenfassen: was wurde eingebunden, wo liegt die neue Preview-View, worauf
   muss ich achten, wenn ich das Design-System in weiteren Screens verwende.

Bitte keine neuen Farb-Hex-Werte oder Fonts erfinden — ausschliesslich die Token aus
WPorbitColor/WPorbitGradient/WPorbitTypography verwenden. Wenn für einen Anwendungsfall
ein Token fehlt, das im DesignSystem.md beschrieben ist, aber noch nicht als Swift-Wert
existiert, ergänze es konsistent zu den bestehenden Namenskonventionen.
```

---

## Wenn du iterativ weiterbauen willst

Für Folge-Screens reicht ein kürzerer Prompt, z.B.:

```
Baue den Screen "<Name>" nach dem WPorbit-Design-System (siehe DesignSystem.md und
Swift/Theme, Swift/Components). Verwende ausschliesslich bestehende Token/Komponenten,
keine neuen Farben oder Fonts.
```
