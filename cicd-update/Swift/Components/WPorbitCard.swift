import SwiftUI

/// Standard V3 panel with one quiet elevation level.
struct WPorbitCard<Content: View>: View {
    var elevated: Bool = false
    var cornerRadius: CGFloat = WPorbitRadius.panel
    @ViewBuilder var content: Content

    var body: some View {
        content
            .padding(WPorbitSpacing.xl)
            .background(elevated ? WPorbitColor.raised : WPorbitColor.surface)
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .stroke(elevated ? WPorbitColor.line : WPorbitColor.borderSoft, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
            .wpShadow(WPorbitShadow.card)
    }
}
