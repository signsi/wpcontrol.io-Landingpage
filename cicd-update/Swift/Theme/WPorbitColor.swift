import SwiftUI

// MARK: - Hex initializer

extension Color {
    init(hex: String) {
        var hexString = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        hexString = hexString.replacingOccurrences(of: "#", with: "")
        var rgb: UInt64 = 0
        Scanner(string: hexString).scanHexInt64(&rgb)

        let r = Double((rgb & 0xFF0000) >> 16) / 255
        let g = Double((rgb & 0x00FF00) >> 8) / 255
        let b = Double(rgb & 0x0000FF) / 255

        self.init(red: r, green: g, blue: b)
    }
}

// MARK: - WPorbit Colors
// Quelle: WPorbit CI/CD Vorschlag (Orbit/Space-Thema), siehe DesignSystem.md

enum WPorbitColor {

    // Hintergrund
    static let backgroundBase     = Color(hex: "#07080D") // Deep Space
    static let backgroundSurface  = Color(hex: "#0E1019") // Surface (Karten, Panels, Section-Tiles)
    static let backgroundElevated = Color(hex: "#151827") // Elevated (hervorgehobene Karten)

    // Linien / Rahmen
    static let borderDefault = Color(hex: "#282C40") // Orbit Line
    static let borderSoft    = Color(hex: "#1A1D2C") // Section-Divider, dezent

    // Text
    static let textPrimary   = Color(hex: "#F4F5F9") // Starlight
    static let textSecondary = Color(hex: "#C4C7D6")
    static let textTertiary  = Color(hex: "#8B8FA6")

    // Akzente
    static let solar         = Color(hex: "#FF6A39") // Primäre CTA-Farbe
    static let solarFlare    = Color(hex: "#FF3D77") // Gradient-Ende, Hover
    static let nebulaViolet  = Color(hex: "#7B5CFA") // Orbit-Gradient Start, Glow
    static let orbitCyan     = Color(hex: "#2FD9EE") // Links, Status "aktiv"
    static let statusSuccess = Color(hex: "#3DDC84") // Erfolgsmeldungen, Terminal-Output

    // Für Text auf hellen/Gradient-Flächen (z.B. Solar-Button-Label)
    static let onSolar = Color(hex: "#0A0B12")
}
