import SwiftUI

/// Single-accent signal dot with an optional orbit frame.
struct PlanetDot: View {
    var size: CGFloat = 12
    var ringPadding: CGFloat = 8
    var gradient: LinearGradient = WPorbitGradient.accent
    var glow: Bool = true

    var body: some View {
        ZStack {
            Circle()
                .stroke(WPorbitColor.line, lineWidth: 1)
                .frame(width: size + ringPadding * 2, height: size + ringPadding * 2)
            Circle()
                .fill(gradient)
                .frame(width: size, height: size)
                .shadow(color: WPorbitColor.accent.opacity(glow ? 0.45 : 0), radius: 8)
        }
    }
}
