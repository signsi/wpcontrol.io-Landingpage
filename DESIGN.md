# WPorbit design tokens

The implementation uses Tailwind CSS v4 theme tokens in `src/index.css`. Components must consume semantic utilities such as `bg-base`, `text-secondary`, `border-line`, `rounded-panel`, and `shadow-card`. Do not duplicate raw color values in components.

## Color roles

| Token | Value | Role |
|---|---|---|
| `base` | `oklch(98.7% 0.004 282)` | Page background |
| `surface` | `oklch(99.4% 0.003 282)` | Panels and controls |
| `raised` | `oklch(96.3% 0.007 284)` | Hover and quiet section fill |
| `line` | `oklch(90.5% 0.007 284)` | Component borders |
| `border-soft` | `oklch(94.5% 0.005 284)` | Section separators |
| `primary` | `oklch(19% 0.014 282)` | Headings and high-emphasis copy |
| `secondary` | `oklch(38% 0.013 282)` | Body copy |
| `tertiary` | `oklch(52% 0.011 282)` | Metadata, AA-safe on `base` |
| `accent` | `oklch(52% 0.185 288)` | Primary action and signal dot |
| `accent-strong` | `oklch(44% 0.17 290)` | Action gradient endpoint |
| `accent-tint` | `oklch(95% 0.028 288)` | Halos and selected states |
| `on-accent` | `oklch(96% 0.006 282)` | Text on accent, 5.31:1 |
| `dark` | `oklch(18% 0.032 267)` | Product sidebar surfaces |

## Geometry and elevation

- `control`: 12px radius for inputs and compact controls.
- `panel`: 20px radius for primary panels.
- `card`: the only normal content elevation, a two-layer 1px shadow.
- `overlay`: reserved for dropdowns, popovers, and modals.
- `action`: violet glow reserved for primary actions.

## Typography

General Sans is self-hosted at weights 400, 500, 600, and 700. Body copy is capped near 65 characters. Display type uses tight tracking and a fluid Tailwind `clamp()` scale.

## Motion

Use `ease-out-expo` for interactive transitions. The orbit dot runs for nine seconds and the atmospheric halo for twelve. All ambient motion is disabled by `prefers-reduced-motion`.
