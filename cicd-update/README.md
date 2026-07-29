# WPorbit V3 Export für Xcode und SwiftUI

Dieses Paket enthält das komplette Corporate Design (Farben, Verläufe, Typografie, Motive) als fertige SwiftUI-Bausteine, die passenden Schriftdateien sowie ein einsatzbereites Prompt-Dokument für die Umsetzung mit einem Coding-Agenten.

## Inhalt

```
DesignSystem.md                   V3 Token-Referenz
Prompts/IMPLEMENTATION_PROMPT.md   Fertiger Prompt für einen Coding-Agenten
Swift/Theme/                      Farben, Typografie, Verläufe, Layout und Schatten
Swift/Components/                 SwiftUI Buttons, Pills, Karten und Orbit-Motive
../public/fonts/GeneralSans-*.ttf Aktuelle V3 Schriftdateien
Assets/logo.svg                   Logo
```

## Fonts in Xcode einbinden

1. Die vier Dateien `public/fonts/GeneralSans-*.ttf` per Drag & Drop in dein Xcode-Projekt ziehen, "Copy items if needed" und das passende Target aktivieren.
2. In den Target-Einstellungen prüfen, dass die Dateien unter "Copy Bundle Resources" (Build Phases) gelistet sind.
3. In der `Info.plist` den Key **"Fonts provided by application"** (`UIAppFonts`) ergänzen:

```xml
<key>UIAppFonts</key>
<array>
    <string>GeneralSans-Regular.ttf</string>
    <string>GeneralSans-Medium.ttf</string>
    <string>GeneralSans-SemiBold.ttf</string>
    <string>GeneralSans-Bold.ttf</string>
</array>
```

4. Zur Kontrolle die verfügbaren Familiennamen ausgeben (einmalig, z.B. in `onAppear` einer Debug-View):

```swift
for family in UIFont.familyNames.sorted() {
    print(family, UIFont.fontNames(forFamilyName: family))
}
```

Die PostScript-Namen sind in `WPorbitTypography.swift` hinterlegt. Technische Werte verwenden die monospaced Systemschrift und benötigen keine weitere Fontdatei.

## Lizenz der Schriften

Die Lizenz für General Sans liegt unter `public/fonts/`.

## Swift-Dateien verwenden

Alle Dateien aus `Swift/Theme` und `Swift/Components` in dein Xcode-Projekt kopieren und dem App-Target zuweisen. `WPorbitLayout.swift` muss gemeinsam mit den übrigen Theme-Dateien eingebunden sein.

```swift
Text("Bring Ordnung in deinen Alltag")
    .font(.wpH1)
    .foregroundStyle(WPorbitColor.textPrimary)

Button("Early Access sichern") { }
    .buttonStyle(.wpPrimary)

Pill(text: "Jetzt verfügbar", style: .active)

WPorbitCard {
    Text("Projektübersicht")
        .font(.wpH3)
}
```

## Nächster Schritt

`Prompts/IMPLEMENTATION_PROMPT.md` enthält ein fertiges Prompt, das du 1:1 an einen Coding-Agenten (z.B. Claude Code, Cursor) in deinem Xcode-Projekt übergeben kannst, um das Design-System einzubauen und eine erste Beispiel-Ansicht damit umzusetzen.
