import SwiftUI

/// Feines, deterministisches Sternenfeld als Hintergrundtextur für Hero- oder
/// dunkle Section-Hintergründe. Deterministisch (Seed), damit sich die Punkte
/// bei jedem Re-Render nicht neu mischen.
///
/// Beispiel:
///   ZStack {
///       WPorbitColor.backgroundBase
///       Starfield(density: 60, opacity: 0.35)
///   }
struct Starfield: View {
    var density: Int = 40
    var opacity: Double = 0.35
    var seed: UInt64 = 42

    var body: some View {
        Canvas { context, size in
            var generator = SeededGenerator(seed: seed)
            for _ in 0..<density {
                let x = CGFloat.random(in: 0...1, using: &generator) * size.width
                let y = CGFloat.random(in: 0...1, using: &generator) * size.height
                let radius = CGFloat.random(in: 0.6...1.6, using: &generator)
                let rect = CGRect(x: x - radius, y: y - radius, width: radius * 2, height: radius * 2)
                context.fill(
                    Path(ellipseIn: rect),
                    with: .color(WPorbitColor.textPrimary.opacity(opacity))
                )
            }
        }
        .allowsHitTesting(false)
    }
}

/// Einfacher, seedbarer Zufallsgenerator für reproduzierbare Layouts.
struct SeededGenerator: RandomNumberGenerator {
    private var state: UInt64
    init(seed: UInt64) { self.state = seed == 0 ? 1 : seed }
    mutating func next() -> UInt64 {
        state = state &* 6364136223846793005 &+ 1442695040888963407
        return state
    }
}
