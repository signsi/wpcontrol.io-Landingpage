import SwiftUI

/// Button sizes — mirror the web `.btn-sm` / `.btn-md` / `.btn-lg` utilities.
enum WPorbitButtonSize {
    case sm, md, lg

    var horizontalPadding: CGFloat {
        switch self {
        case .sm: return 16
        case .md: return 20
        case .lg: return 24
        }
    }

    var verticalPadding: CGFloat {
        switch self {
        case .sm: return 10
        case .md: return 12
        case .lg: return 14
        }
    }

    var fontSize: CGFloat {
        self == .sm ? 13 : 14
    }
}

/// Primary action. Use once per decision group.
/// Pill-shaped to match the web `.btn-primary` utility — buttons are Capsule,
/// `WPorbitRadius.control` is reserved for compact non-button controls.
struct WPorbitPrimaryButtonStyle: ButtonStyle {
    var size: WPorbitButtonSize = .lg

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(size.fontSize, weight: .semibold))
            .foregroundStyle(WPorbitColor.onAccent)
            .padding(.horizontal, size.horizontalPadding)
            .padding(.vertical, size.verticalPadding)
            .background(WPorbitGradient.accent)
            .clipShape(Capsule(style: .continuous))
            .wpShadow(WPorbitShadow.action)
            .opacity(configuration.isPressed ? 0.85 : 1)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
    }
}

/// Secondary outline action.
struct WPorbitSecondaryButtonStyle: ButtonStyle {
    var size: WPorbitButtonSize = .lg

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(size.fontSize, weight: .semibold))
            .foregroundStyle(WPorbitColor.textPrimary)
            .padding(.horizontal, size.horizontalPadding)
            .padding(.vertical, size.verticalPadding)
            .background(configuration.isPressed ? WPorbitColor.raised : Color.clear)
            .overlay(
                Capsule(style: .continuous)
                    .stroke(WPorbitColor.line, lineWidth: 1)
            )
            .clipShape(Capsule(style: .continuous))
            .opacity(configuration.isPressed ? 0.7 : 1)
    }
}

/// Primary action on dark/product surfaces (e.g. Cloud). Mirrors web `.btn-on-dark`.
struct WPorbitOnDarkButtonStyle: ButtonStyle {
    var size: WPorbitButtonSize = .md

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(WPorbitFont.body(size.fontSize, weight: .semibold))
            .foregroundStyle(WPorbitColor.dark)
            .padding(.horizontal, size.horizontalPadding)
            .padding(.vertical, size.verticalPadding)
            .background(configuration.isPressed ? WPorbitColor.accentTint : WPorbitColor.onDark)
            .overlay(
                Capsule(style: .continuous)
                    .stroke(WPorbitColor.onDark.opacity(0.2), lineWidth: 1)
            )
            .clipShape(Capsule(style: .continuous))
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
    static func wpPrimary(_ size: WPorbitButtonSize) -> WPorbitPrimaryButtonStyle { .init(size: size) }
}
extension ButtonStyle where Self == WPorbitSecondaryButtonStyle {
    static var wpSecondary: WPorbitSecondaryButtonStyle { .init() }
    static func wpSecondary(_ size: WPorbitButtonSize) -> WPorbitSecondaryButtonStyle { .init(size: size) }
}
extension ButtonStyle where Self == WPorbitOnDarkButtonStyle {
    static var wpOnDark: WPorbitOnDarkButtonStyle { .init() }
    static func wpOnDark(_ size: WPorbitButtonSize) -> WPorbitOnDarkButtonStyle { .init(size: size) }
}
extension ButtonStyle where Self == WPorbitGhostButtonStyle {
    static var wpGhost: WPorbitGhostButtonStyle { .init() }
}
