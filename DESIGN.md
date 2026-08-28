# Design System: The Guild & Ledger

A deliberate, tactile design system for the **Student Course Dashboard**, inspired by scholarly field notebooks, botanical monographs, and physical guild ledgers.

---

## 1. Philosophy & Aesthetic Intent

Modern web dashboards too frequently default to generic SaaS tropes: saturated purple/indigo buttons, 24px puffy rounded bubbles, floating glow gradients, and arbitrary emoji badges.

**The Guild & Ledger** system rejects those defaults in favor of:
- **Tangibility**: High-contrast, warm alabaster paper tones paired with charcoal ink and terracotta accents.
- **Architectural Framing**: Strict 1px hairline borders instead of noisy drop-shadow stacks.
- **Typographic Gravity**: Classical editorial headings (`Newsreader`) grounded by clean contemporary geometric body typography (`Plus Jakarta Sans`) and precise monospace data points (`JetBrains Mono`).
- **Domain Specificity**: Milestone progress is visualized as an engraved, segmented chapter index / notebook spine rather than arbitrary spinning rings.

---

## 2. Design Tokens

### Color Palette

| Token | Light Value | Dark Value | Rationale |
| :--- | :--- | :--- | :--- |
| `canvas-bg` | `#FBF9F5` | `#111215` | Warm alabaster / Obsidian basalt. Reduces eye strain during study. |
| `surface-card` | `#FFFFFF` | `#181A20` | Crisp linen chalk / Dark slate for high contrast structured modules. |
| `surface-muted` | `#F2EFE9` | `#20232B` | Inset lesson trays, metadata containers, table headers. |
| `ink-primary` | `#1C1917` | `#F4F4F6` | Deep umber charcoal for maximum clarity without harsh pure `#000`. |
| `ink-muted` | `#78716C` | `#9496A1` | Warm slate for lesson durations, instructor titles, and captions. |
| `border-line` | `#E7E2D8` | `#2A2E39` | 1px hairline border separating catalog items with architectural order. |
| `brand-terracotta` | `#D95D39` | `#FF7A59` | Burnt sienna / Vibrant coral for primary call-to-actions and active states. |
| `progress-spruce` | `#266B56` | `#3EBA8C` | Deep botanical spruce for completed lessons, milestone mastery, and high achievement. |
| `amber-gauge` | `#D97706` | `#F59E0B` | Warm ochre amber for ongoing work, active lesson pips, and review flags. |

---

## 3. Typography System

- **Display (`font-display`)**: `Newsreader` (Serif)
  - Used for: Page headers, course titles, module chapter names.
  - Optical sizing gives it rich editorial elegance and scholastic authority.
- **Sans (`font-sans`)**: `Plus Jakarta Sans`
  - Used for: General navigation, card bodies, buttons, form controls, descriptions.
  - Clean, open counters with tall x-height for effortless legibility.
- **Mono (`font-mono`)**: `JetBrains Mono`
  - Used for: Progress percentages (`68%`), step counters (`03/05`), duration stamps (`12:45`), course codes (`CS-402`).

---

## 4. Spacing, Radius & Elevation Scale

- **Border Radius**:
  - `rounded-sm`: `4px` (Tags, micro badges, checkbox containers)
  - `rounded-md`: `6px` (Buttons, inputs, lesson list items)
  - `rounded-lg`: `10px` (Main cards, modal dialogs, course banners)
- **Shadows**:
  - `shadow-ledger-sm`: `0 1px 2px rgba(28, 25, 23, 0.05)`
  - `shadow-ledger-md`: `0 4px 14px -2px rgba(28, 25, 23, 0.06), 0 2px 4px -1px rgba(28, 25, 23, 0.03)`

---

## 5. Signature Visual Element: "The Ledger Milestone Spine"

Instead of generic circular charts or plain progress bars:
1. **Segmented Chapter Index**: Courses display physical progress notches representing each lesson (`[▪][▪][▪][▫][▫]`).
2. **Monospace Telemetry Stamps**: Status is communicated via crisp badge stamps (`ENROLLED`, `ACTIVE · 3/5 COMPLETED`, `ACQUIRED`).
3. **Pure Iconography**: Exclusively using `react-icons` (e.g. `FiBookOpen`, `FiCheckCircle`, `FiLayers`, `FiClock`, `FiArrowRight`), never raw emojis.
