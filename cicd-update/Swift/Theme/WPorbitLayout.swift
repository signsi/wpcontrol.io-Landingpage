import SwiftUI

enum WPorbitSpacing {
    static let xxs: CGFloat = 4
    static let xs: CGFloat = 6
    static let sm: CGFloat = 8
    static let md: CGFloat = 12
    static let lg: CGFloat = 16
    static let xl: CGFloat = 24
    static let xxl: CGFloat = 32
    static let section: CGFloat = 64
}

enum WPorbitRadius {
    static let control: CGFloat = 12
    static let panel: CGFloat = 20
}

struct WPorbitShadowToken {
    let color: Color
    let radius: CGFloat
    let x: CGFloat
    let y: CGFloat
}

enum WPorbitShadow {
    static let card = WPorbitShadowToken(
        color: WPorbitColor.textPrimary.opacity(0.06),
        radius: 2,
        x: 0,
        y: 1
    )

    static let overlay = WPorbitShadowToken(
        color: WPorbitColor.textPrimary.opacity(0.16),
        radius: 20,
        x: 0,
        y: 8
    )

    static let action = WPorbitShadowToken(
        color: WPorbitColor.accent.opacity(0.45),
        radius: 12,
        x: 0,
        y: 8
    )
}

extension View {
    func wpShadow(_ token: WPorbitShadowToken) -> some View {
        shadow(color: token.color, radius: token.radius, x: token.x, y: token.y)
    }
}
