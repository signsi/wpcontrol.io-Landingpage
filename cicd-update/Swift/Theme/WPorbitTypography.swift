import SwiftUI

// MARK: - WPorbit Typografie
//
// Voraussetzung: die TTF-Dateien aus /Fonts sind dem Xcode-Target hinzugefügt
// (Copy Bundle Resources) und in Info.plist unter "Fonts provided by application"
// (UIAppFonts) eingetragen. Siehe README.md, Abschnitt "Fonts einbinden".
//
// Headlines:     Chakra Petch   (Medium / SemiBold / Bold)
// Fliesstext:    Hanken Grotesk (Regular / Medium / SemiBold / Bold)
// Code / Labels: Space Mono     (Regular / Bold)

enum WPorbitFont {

    enum HeadlineWeight: String {
        case medium   = "ChakraPetch-Medium"
        case semibold = "ChakraPetch-SemiBold"
        case bold     = "ChakraPetch-Bold"
    }

    enum BodyWeight: String {
        case regular  = "HankenGrotesk-Regular"
        case medium   = "HankenGrotesk-Medium"
        case semibold = "HankenGrotesk-SemiBold"
        case bold     = "HankenGrotesk-Bold"
    }

    enum MonoWeight: String {
        case regular = "SpaceMono-Regular"
        case bold    = "SpaceMono-Bold"
    }

    static func headline(_ size: CGFloat, weight: HeadlineWeight = .semibold) -> Font {
        .custom(weight.rawValue, size: size)
    }

    static func body(_ size: CGFloat, weight: BodyWeight = .regular) -> Font {
        .custom(weight.rawValue, size: size)
    }

    static func mono(_ size: CGFloat, weight: MonoWeight = .regular) -> Font {
        .custom(weight.rawValue, size: size)
    }
}

// MARK: - Fertige Textstile (analog zur H1-H3 / Body / Caption Skala im Web-CI)

extension Font {
    static let wpDisplay = WPorbitFont.headline(34, weight: .semibold)   // Hero-Headline
    static let wpH1      = WPorbitFont.headline(28, weight: .semibold)   // Screen-Titel
    static let wpH2      = WPorbitFont.headline(22, weight: .semibold)   // Section-Titel
    static let wpH3      = WPorbitFont.headline(17, weight: .semibold)   // Karten-Titel
    static let wpBody    = WPorbitFont.body(16)                         // Fliesstext
    static let wpBodyStrong = WPorbitFont.body(16, weight: .semibold)
    static let wpCaption = WPorbitFont.mono(11)                         // Kicker, Pills, Meta-Labels
    static let wpCode    = WPorbitFont.mono(13)                         // Terminal-/Code-Blöcke
}

// MARK: - Kicker-Textstil (Uppercase + Letter-Spacing), analog zum Web-Kicker

struct KickerText: View {
    var text: String
    var color: Color = WPorbitColor.orbitCyan

    var body: some View {
        HStack(spacing: 8) {
            Circle()
                .fill(WPorbitColor.solar)
                .frame(width: 6, height: 6)
                .shadow(color: WPorbitColor.solar.opacity(0.7), radius: 4)
            Text(text.uppercased())
                .font(.wpCaption)
                .tracking(1.4)
                .foregroundColor(color)
        }
    }
}
