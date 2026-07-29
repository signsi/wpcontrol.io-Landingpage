import SwiftUI

enum WPorbitGradient {
    static let accent = LinearGradient(
        colors: [WPorbitColor.accent, WPorbitColor.accentStrong],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let halo = RadialGradient(
        colors: [WPorbitColor.accentTint, WPorbitColor.accentTint.opacity(0)],
        center: .center,
        startRadius: 0,
        endRadius: 220
    )

    static func haloGlow(size: CGFloat = 420) -> some View {
        Circle()
            .fill(halo)
            .frame(width: size, height: size)
            .blur(radius: 30)
            .opacity(0.55)
            .allowsHitTesting(false)
    }

    @available(*, deprecated, renamed: "accent") static let solar = accent
    @available(*, deprecated, renamed: "accent") static let orbit = accent

    @available(*, deprecated, message: "Use haloGlow(size:) instead.")
    static func nebulaGlow(size: CGFloat = 420) -> some View {
        haloGlow(size: size)
    }
}
