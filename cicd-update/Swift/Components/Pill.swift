import SwiftUI

/// Compact semantic badge.
///
/// Beispiel:
///   Pill(text: "Cloud · Empfohlen", style: .active)
struct Pill: View {
    enum Style { case neutral, active, warning }

    var text: String
    var style: Style = .neutral

    var body: some View {
        Text(text.uppercased())
            .font(.wpCaption)
            .tracking(1.2)
            .foregroundColor(foreground)
            .padding(.horizontal, WPorbitSpacing.md)
            .padding(.vertical, WPorbitSpacing.xs)
            .overlay(Capsule().stroke(border, lineWidth: 1))
    }

    private var foreground: Color {
        switch style {
        case .neutral: return WPorbitColor.textTertiary
        case .active:  return WPorbitColor.accentStrong
        case .warning: return WPorbitColor.danger
        }
    }

    private var border: Color {
        switch style {
        case .neutral: return WPorbitColor.line
        case .active:  return WPorbitColor.accent
        case .warning: return WPorbitColor.danger
        }
    }
}
