import SwiftUI

/// Primary action. Use once per decision group.
struct WPorbitPrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(15, weight: .semibold))
            .foregroundStyle(WPorbitColor.onAccent)
            .padding(.horizontal, WPorbitSpacing.xl)
            .padding(.vertical, WPorbitSpacing.md)
            .background(WPorbitGradient.accent)
            .clipShape(RoundedRectangle(cornerRadius: WPorbitRadius.control, style: .continuous))
            .wpShadow(WPorbitShadow.action)
            .opacity(configuration.isPressed ? 0.85 : 1)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
    }
}

/// Secondary outline action.
struct WPorbitSecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(15, weight: .semibold))
            .foregroundStyle(WPorbitColor.textPrimary)
            .padding(.horizontal, WPorbitSpacing.xl)
            .padding(.vertical, WPorbitSpacing.md)
            .background(configuration.isPressed ? WPorbitColor.raised : Color.clear)
            .overlay(
                RoundedRectangle(cornerRadius: WPorbitRadius.control, style: .continuous)
                    .stroke(WPorbitColor.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: WPorbitRadius.control, style: .continuous))
            .opacity(configuration.isPressed ? 0.7 : 1)
    }
}

/// Tertiary text action.
struct WPorbitGhostButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(15, weight: .semibold))
            .foregroundStyle(WPorbitColor.textSecondary)
            .opacity(configuration.isPressed ? 0.6 : 1)
    }
}

extension ButtonStyle where Self == WPorbitPrimaryButtonStyle {
    static var wpPrimary: WPorbitPrimaryButtonStyle { .init() }
}
extension ButtonStyle where Self == WPorbitSecondaryButtonStyle {
    static var wpSecondary: WPorbitSecondaryButtonStyle { .init() }
}
extension ButtonStyle where Self == WPorbitGhostButtonStyle {
    static var wpGhost: WPorbitGhostButtonStyle { .init() }
}
