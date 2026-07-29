import SwiftUI

// General Sans files must be included in Copy Bundle Resources and UIAppFonts.
enum WPorbitFont {
    enum HeadlineWeight: String {
        case medium = "GeneralSans-Medium"
        case semibold = "GeneralSans-SemiBold"
        case bold = "GeneralSans-Bold"
    }

    enum BodyWeight: String {
        case regular = "GeneralSans-Regular"
        case medium = "GeneralSans-Medium"
        case semibold = "GeneralSans-SemiBold"
        case bold = "GeneralSans-Bold"
    }

    enum MonoWeight {
        case regular
        case bold

        fileprivate var systemWeight: Font.Weight {
            self == .bold ? .bold : .regular
        }
    }

    static func headline(_ size: CGFloat, weight: HeadlineWeight = .semibold) -> Font {
        .custom(weight.rawValue, size: size)
    }

    static func body(_ size: CGFloat, weight: BodyWeight = .regular) -> Font {
        .custom(weight.rawValue, size: size)
    }

    static func mono(_ size: CGFloat, weight: MonoWeight = .regular) -> Font {
        .system(size: size, weight: weight.systemWeight, design: .monospaced)
    }
}

extension Font {
    static let wpDisplay = WPorbitFont.headline(34, weight: .bold)
    static let wpH1 = WPorbitFont.headline(28, weight: .semibold)
    static let wpH2 = WPorbitFont.headline(22, weight: .semibold)
    static let wpH3 = WPorbitFont.headline(17, weight: .semibold)
    static let wpBody = WPorbitFont.body(16)
    static let wpBodyStrong = WPorbitFont.body(16, weight: .semibold)
    static let wpCaption = WPorbitFont.body(11, weight: .semibold)
    static let wpCode = WPorbitFont.mono(13)
}

struct KickerText: View {
    var text: String
    var color: Color = WPorbitColor.accentStrong

    var body: some View {
        HStack(spacing: WPorbitSpacing.sm) {
            Circle()
                .fill(WPorbitColor.accent)
                .frame(width: 6, height: 6)
            Text(text.uppercased())
                .font(.wpCaption)
                .tracking(1)
                .foregroundStyle(color)
        }
    }
}
