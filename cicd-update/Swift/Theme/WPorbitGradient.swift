import SwiftUI

// MARK: - WPorbit Gradients

enum WPorbitGradient {

    /// Kühler Verlauf für Struktur, Glow, Charts, Gradient-Text.
    static let orbit = LinearGradient(
        colors: [WPorbitColor.nebulaViolet, WPorbitColor.orbitCyan],
        startPoint: .leading,
        endPoint: .trailing
    )

    /// Warmer Verlauf für primäre Call-to-Actions.
    static let solar = LinearGradient(
        colors: [WPorbitColor.solar, WPorbitColor.solarFlare],
        startPoint: .leading,
        endPoint: .trailing
    )

    /// Weicher Nebel-Glow für Hero-/Header-Hintergründe. In einer ZStack hinter
    /// dem Inhalt platzieren und mit .blur(radius: 40-60) versehen.
    static func nebulaGlow(size: CGFloat = 500) -> some View {
        ZStack {
            Circle()
                .fill(WPorbitColor.nebulaViolet.opacity(0.28))
                .frame(width: size, height: size)
                .offset(x: -size * 0.15, y: -size * 0.1)
            Circle()
                .fill(WPorbitColor.orbitCyan.opacity(0.18))
                .frame(width: size * 0.8, height: size * 0.8)
                .offset(x: size * 0.2, y: size * 0.15)
        }
        .blur(radius: 60)
    }
}
