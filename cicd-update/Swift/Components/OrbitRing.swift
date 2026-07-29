import SwiftUI

/// Offener Orbit-Bogen — das grafische Kernmotiv aus dem Logo, wiederverwendbar
/// als Divider, Deko-Element hinter Karten oder Loading-Indikator.
///
/// Beispiel:
///   OrbitRing(startAngle: -160, endAngle: 160)
///       .stroke(WPorbitColor.line, lineWidth: 1.5)
///       .frame(width: 220, height: 90)
///       .rotationEffect(.degrees(-18))
struct OrbitRing: Shape {
    var startAngle: Double = -160
    var endAngle: Double = 160

    func path(in rect: CGRect) -> Path {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        var path = Path()
        path.addArc(
            center: .zero,
            radius: 1,
            startAngle: .degrees(startAngle),
            endAngle: .degrees(endAngle),
            clockwise: false
        )
        let transform = CGAffineTransform.identity
            .translatedBy(x: center.x, y: center.y)
            .scaledBy(x: rect.width / 2, y: rect.height / 2)
        return path.applying(transform)
    }
}

/// Geschlossener, dünner Orbit-Ring (z.B. Rahmen um Avatare/Status-Punkte).
struct OrbitFrame: View {
    var diameter: CGFloat
    var lineWidth: CGFloat = 1

    var body: some View {
        Circle()
            .stroke(WPorbitColor.line, lineWidth: lineWidth)
            .frame(width: diameter, height: diameter)
    }
}

/// Geschwungene Divider-Linie zwischen zwei Sections (statt gerader Trennlinie).
struct OrbitDivider: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let midY = rect.midY
        path.move(to: CGPoint(x: rect.minX, y: midY))
        path.addCurve(
            to: CGPoint(x: rect.maxX, y: midY),
            control1: CGPoint(x: rect.width * 0.25, y: rect.minY - rect.height),
            control2: CGPoint(x: rect.width * 0.75, y: rect.maxY + rect.height)
        )
        return path
    }
}
