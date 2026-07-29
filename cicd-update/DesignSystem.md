# WPorbit V3 Design System for SwiftUI

This folder mirrors the Tailwind V3 theme from `src/index.css`. Swift colors are declared from the same OKLCH source values and converted to sRGB at runtime.

## Semantic colors

| Swift token | OKLCH | Purpose |
|---|---|---|
| `WPorbitColor.base` | `98.7% 0.004 282` | App background |
| `WPorbitColor.surface` | `99.4% 0.003 282` | Panels and controls |
| `WPorbitColor.raised` | `96.3% 0.007 284` | Selected and hover surfaces |
| `WPorbitColor.line` | `90.5% 0.007 284` | Component borders |
| `WPorbitColor.borderSoft` | `94.5% 0.005 284` | Quiet separators |
| `WPorbitColor.textPrimary` | `19% 0.014 282` | Headings |
| `WPorbitColor.textSecondary` | `38% 0.013 282` | Body copy |
| `WPorbitColor.textTertiary` | `52% 0.011 282` | Metadata |
| `WPorbitColor.accent` | `52% 0.185 288` | Primary actions and signal dots |
| `WPorbitColor.accentStrong` | `44% 0.17 290` | Accent gradient endpoint |
| `WPorbitColor.accentTint` | `95% 0.028 288` | Selected states and halos |
| `WPorbitColor.onAccent` | `96% 0.006 282` | Primary-button label |
| `WPorbitColor.dark` | `18% 0.032 267` | Explicit dark product surfaces |

`textTertiary` and the accent/on-accent combination reproduce the contrast-corrected web values.

## Typography

General Sans is used for headings, body copy, and labels. Swift's system monospaced design is reserved for technical values and code. Ready-made styles include `.wpDisplay`, `.wpH1`, `.wpH2`, `.wpH3`, `.wpBody`, `.wpBodyStrong`, `.wpCaption`, and `.wpCode`.

## Layout and elevation

- Controls: `WPorbitRadius.control` (12 pt)
- Panels: `WPorbitRadius.panel` (20 pt)
- Spacing: `WPorbitSpacing.xxs` through `.section`
- Normal panels: `WPorbitShadow.card`
- Primary actions: `WPorbitShadow.action`
- Popovers and overlays only: `WPorbitShadow.overlay`

Apply shadows with `.wpShadow(WPorbitShadow.card)`.

## Components

The components under `Swift/Components` consume semantic V3 tokens:

- `WPorbitPrimaryButtonStyle`, `WPorbitSecondaryButtonStyle`, `WPorbitGhostButtonStyle`
- `WPorbitCard`
- `Pill`
- `PlanetDot`
- `OrbitRing`, `OrbitFrame`, `OrbitDivider`
- `Starfield`, only for intentionally dark product surfaces

Legacy names such as `solar`, `orbitCyan`, and `backgroundBase` remain as deprecated aliases so existing screens can migrate incrementally.
