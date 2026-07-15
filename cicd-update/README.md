# WPorbit CI/CD Export — für Xcode/Swift

Dieses Paket enthält das komplette Corporate Design (Farben, Verläufe, Typografie, Motive) als fertige SwiftUI-Bausteine, die passenden Schriftdateien sowie ein einsatzbereites Prompt-Dokument für die Umsetzung mit einem Coding-Agenten.

## Inhalt

```
DesignSystem.md              Vollständige CI/CD-Dokumentation (Referenz)
Prompts/IMPLEMENTATION_PROMPT.md   Fertiger Prompt für einen Coding-Agenten
Swift/Theme/                 Farb-, Verlaufs- und Typografie-Token
Swift/Components/            Orbit-Motive, Buttons, Pills, Karten als SwiftUI Views
Fonts/                       Chakra Petch, Hanken Grotesk, Space Mono (.ttf) + Lizenzen
Assets/logo.svg              Logo (unverändert)
```

## Fonts in Xcode einbinden

1. Ordner `Fonts/*.ttf` per Drag & Drop in dein Xcode-Projekt ziehen, "Copy items if needed" + passendes Target aktivieren.
2. In den Target-Einstellungen prüfen, dass die Dateien unter "Copy Bundle Resources" (Build Phases) gelistet sind.
3. In der `Info.plist` den Key **"Fonts provided by application"** (`UIAppFonts`) ergänzen und dort alle 9 Dateinamen eintragen, z.B.:

```xml
<key>UIAppFonts</key>
<array>
    <string>ChakraPetch-Medium.ttf</string>
    <string>ChakraPetch-SemiBold.ttf</string>
    <string>ChakraPetch-Bold.ttf</string>
    <string>HankenGrotesk-Regular.ttf</string>
    <string>HankenGrotesk-Medium.ttf</string>
    <string>HankenGrotesk-SemiBold.ttf</string>
    <string>HankenGrotesk-Bold.ttf</string>
    <string>SpaceMono-Regular.ttf</string>
    <string>SpaceMono-Bold.ttf</string>
</array>
```

4. Zur Kontrolle die verfügbaren Familiennamen ausgeben (einmalig, z.B. in `onAppear` einer Debug-View):

```swift
for family in UIFont.familyNames.sorted() {
    print(family, UIFont.fontNames(forFamilyName: family))
}
```

Die PostScript-Namen sind bereits in `WPorbitTypography.swift` hinterlegt (`ChakraPetch-Medium`, `HankenGrotesk-Regular`, `SpaceMono-Regular`, ...) — dort muss nichts angepasst werden, solange die Fonts korrekt eingebunden sind.

## Lizenz der Schriften

Chakra Petch, Hanken Grotesk und Space Mono stehen unter der SIL Open Font License (OFL) — freie Nutzung, auch kommerziell, inkl. Einbettung in App-Bundles. Volltext siehe `Fonts/LICENSE-*.txt`.

## Swift-Dateien verwenden

Alle Dateien aus `Swift/Theme` und `Swift/Components` einfach in dein Xcode-Projekt kopieren (keine externen Abhängigkeiten). Beispiel:

```swift
Text("Bring Ordnung in deinen Alltag")
    .font(.wpH1)
    .foregroundColor(WPorbitColor.textPrimary)

Button("Early Access sichern") { }
    .buttonStyle(.wpPrimary)

Pill(text: "Cloud · Empfohlen", style: .active)
```

## Nächster Schritt

`Prompts/IMPLEMENTATION_PROMPT.md` enthält ein fertiges Prompt, das du 1:1 an einen Coding-Agenten (z.B. Claude Code, Cursor) in deinem Xcode-Projekt übergeben kannst, um das Design-System einzubauen und eine erste Beispiel-Ansicht damit umzusetzen.
