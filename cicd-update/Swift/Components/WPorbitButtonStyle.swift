import SwiftUI

/// Primärer Button — Solar-Gradient, für die eine Haupt-Aktion pro Screen.
struct WPorbitPrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(15, weight: .semibold))
            .foregroundColor(WPorbitColor.onSolar)
            .padding(.horizontal, 22)
            .padding(.vertical, 12)
            .background(WPorbitGradient.solar)
            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            .shadow(color: WPorbitColor.solar.opacity(0.28), radius: 16, y: 8)
            .opacity(configuration.isPressed ? 0.85 : 1)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
    }
}

/// Sekundärer Button — Outline, für die zweite Aktion.
struct WPorbitSecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(15, weight: .semibold))
            .foregroundColor(WPorbitColor.textPrimary)
            .padding(.horizontal, 22)
            .padding(.vertical, 12)
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(WPorbitColor.borderDefault, lineWidth: 1)
            )
            .opacity(configuration.isPressed ? 0.7 : 1)
    }
}

/// Ghost-Button — reiner Text-Link, für tertiäre Aktionen.
struct WPorbitGhostButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(15, weight: .semibold))
            .foregroundColor(WPorbitColor.textSecondary)
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
