import SwiftUI
import Foundation

// MARK: - OKLCH support

extension Color {
    /// Creates an sRGB SwiftUI color from the same OKLCH values used by the web theme.
    init(oklchLightness lightness: Double, chroma: Double, hue: Double, opacity: Double = 1) {
        let hueRadians = hue * .pi / 180
        let a = chroma * cos(hueRadians)
        let b = chroma * sin(hueRadians)

        let lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b
        let mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b
        let sRoot = lightness - 0.0894841775 * a - 1.2914855480 * b

        let l = lRoot * lRoot * lRoot
        let m = mRoot * mRoot * mRoot
        let s = sRoot * sRoot * sRoot

        let linearRed = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
        let linearGreen = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
        let linearBlue = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

        func gammaCorrect(_ component: Double) -> Double {
            let value = component <= 0.0031308
                ? 12.92 * component
                : 1.055 * pow(component, 1 / 2.4) - 0.055
            return min(max(value, 0), 1)
        }

        self.init(
            .sRGB,
            red: gammaCorrect(linearRed),
            green: gammaCorrect(linearGreen),
            blue: gammaCorrect(linearBlue),
            opacity: opacity
        )
    }
}

// MARK: - WPorbit V3 semantic colors

enum WPorbitColor {
    // Surfaces
    static let base = Color(oklchLightness: 0.987, chroma: 0.004, hue: 282)
    static let surface = Color(oklchLightness: 0.994, chroma: 0.003, hue: 282)
    static let raised = Color(oklchLightness: 0.963, chroma: 0.007, hue: 284)
    static let dark = Color(oklchLightness: 0.18, chroma: 0.032, hue: 267)
    static let onDark = Color(oklchLightness: 0.96, chroma: 0.006, hue: 282)

    // Lines
    static let line = Color(oklchLightness: 0.905, chroma: 0.007, hue: 284)
    static let borderSoft = Color(oklchLightness: 0.945, chroma: 0.005, hue: 284)

    // Text
    static let textPrimary = Color(oklchLightness: 0.19, chroma: 0.014, hue: 282)
    static let textSecondary = Color(oklchLightness: 0.38, chroma: 0.013, hue: 282)
    static let textTertiary = Color(oklchLightness: 0.52, chroma: 0.011, hue: 282)

    // Actions and status
    static let accent = Color(oklchLightness: 0.52, chroma: 0.185, hue: 288)
    static let accentStrong = Color(oklchLightness: 0.44, chroma: 0.17, hue: 290)
    static let accentTint = Color(oklchLightness: 0.95, chroma: 0.028, hue: 288)
    static let onAccent = Color(oklchLightness: 0.96, chroma: 0.006, hue: 282)
    static let success = Color(oklchLightness: 0.48, chroma: 0.10, hue: 150)
    static let danger = Color(oklchLightness: 0.52, chroma: 0.16, hue: 25)

    // Compatibility aliases for screens still using the earlier API.
    @available(*, deprecated, renamed: "base") static let backgroundBase = base
    @available(*, deprecated, renamed: "surface") static let backgroundSurface = surface
    @available(*, deprecated, renamed: "raised") static let backgroundElevated = raised
    @available(*, deprecated, renamed: "line") static let borderDefault = line
    @available(*, deprecated, renamed: "accent") static let solar = accent
    @available(*, deprecated, renamed: "accentStrong") static let solarFlare = accentStrong
    @available(*, deprecated, renamed: "accent") static let nebulaViolet = accent
    @available(*, deprecated, renamed: "accentStrong") static let orbitCyan = accentStrong
    @available(*, deprecated, renamed: "success") static let statusSuccess = success
    @available(*, deprecated, renamed: "onAccent") static let onSolar = onAccent
}
