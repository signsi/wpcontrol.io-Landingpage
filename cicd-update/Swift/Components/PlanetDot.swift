import SwiftUI

/// Kreis + Ring — das "Planet"-Motiv. Einsetzbar als Bullet-Point, Status-Indikator
/// oder Icon-Rahmen (analog zu den Feature-Icons im Web-CI).
///
/// Beispiel:
///   PlanetDot()                              // Standard, Solar-Gradient
///   PlanetDot(gradient: WPorbitGradient.orbit) // Orbit-Variante
struct PlanetDot: View {
    var size: CGFloat = 12
    var ringPadding: CGFloat = 8
    var gradient: LinearGradient = WPorbitGradient.solar
    var glow: Bool = true

    var body: some View {
        ZStack {
            Circle()
                .stroke(WPorbitColor.borderDefault, lineWidth: 1)
                .frame(width: size + ringPadding * 2, height: size + ringPadding * 2)
            Circle()
                .fill(gradient)
                .frame(width: size, height: size)
                .shadow(color: WPorbitColor.solar.opacity(glow ? 0.5 : 0), radius: 10)
        }
    }
}
