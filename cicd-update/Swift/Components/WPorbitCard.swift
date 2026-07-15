import SwiftUI

/// Standard-Karte im WPorbit-CI: abgerundet, dünner Orbit-Line-Rahmen,
/// Surface- oder Elevated-Hintergrund.
struct WPorbitCard<Content: View>: View {
    var elevated: Bool = false
    var cornerRadius: CGFloat = 16
    @ViewBuilder var content: Content

    var body: some View {
        content
            .padding(24)
            .background(elevated ? WPorbitColor.backgroundElevated : WPorbitColor.backgroundSurface)
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .stroke(WPorbitColor.borderDefault, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
    }
}
