import SwiftUI

/// Badge/Status-Pill mit Orbit-Ring-Rahmen (Space-Mono, Uppercase).
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
            .padding(.horizontal, 12)
            .padding(.vertical, 5)
            .overlay(Capsule().stroke(border, lineWidth: 1))
    }

    private var foreground: Color {
        switch style {
        case .neutral: return WPorbitColor.textTertiary
        case .active:  return WPorbitColor.orbitCyan
        case .warning: return WPorbitColor.solar
        }
    }

    private var border: Color {
        switch style {
        case .neutral: return WPorbitColor.borderDefault
        case .active:  return WPorbitColor.orbitCyan
        case .warning: return WPorbitColor.solar
        }
    }
}
