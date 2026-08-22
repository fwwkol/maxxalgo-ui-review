# MaxxAlgo Terminal — UI Style Guide

A trading terminal is read, not browsed. Every rule below exists to make numbers
comparable at a glance and to keep destructive actions from being clicked by accident.

Live reference: `/styleguide` · type spec: `/typography`

---

## 1. Principles

1. **Density over decoration.** Rows are 32–36px. No card shadows, no gradients, no rounded-3xl.
2. **One colour claim per row.** Status is the only coloured chip; metadata is muted mono text.
3. **Numbers align or they lie.** Every numeric column is `font-mono tabular-nums text-right`.
4. **Flat is quiet.** A zero P&L renders as `—`, never `+₹0.00`.
5. **Shared context lives in headers**, not repeated in every row (expiry, spot, qty).
6. **Destructive actions are outlined, never filled**, and always confirm.

---

## 2. Colour tokens

Defined in `src/styles.css` (`:root` + `.dark`), mapped in `@theme inline`.
Never write `text-white`, `bg-black`, or hex values in components.

| Token | Utility | Light | Dark | Use |
| --- | --- | --- | --- | --- |
| `--background` | `bg-background` | `oklch(1 0 0)` | `oklch(0.145 0.01 258)` | Page canvas |
| `--surface` | `bg-surface` | `oklch(1 0 0)` | `oklch(0.19 0.012 258)` | Panels, cards, top bar |
| `--surface-2` | `bg-surface-2` | `oklch(0.982 0.004 250)` | `oklch(0.23 0.014 258)` | Table heads, row hover, inputs |
| `--hairline` | `border-hairline` | `oklch(0.918 0.008 250)` | `oklch(0.3 0.016 258)` | Every divider and panel border |
| `--foreground` | `text-foreground` | `oklch(0.129 …)` | `oklch(0.984 …)` | Primary text, identities, values |
| `--muted-foreground` | `text-muted-foreground` | `oklch(0.554 …)` | `oklch(0.72 0.02 258)` | Labels, metadata, captions |
| `--profit` | `text-profit` | `oklch(0.62 0.15 158)` | `oklch(0.76 0.16 158)` | Gains, live/healthy state |
| `--loss` | `text-loss` | `oklch(0.6 0.21 22)` | `oklch(0.7 0.19 22)` | Losses, destructive actions |
| `--warn` | `text-warn` | `oklch(0.72 0.15 75)` | `oklch(0.82 0.15 82)` | Sandbox, rejections, no-bid |
| `--primary` | `bg-primary` | near-black | near-white | Avatar, single primary CTA |

Semantic pairings (fixed, do not improvise):

- gain → `text-profit`; loss → `text-loss`; flat → `text-muted-foreground` + `—`
- tinted container → `border-<token>/40 bg-<token>/10 text-<token>` at 10 % / 40 % only
- never use `profit` green for a non-financial success state, or `chart-*` tokens for P&L

### Dark mode

Class-based: `document.documentElement.classList.toggle("dark", …)` via
`src/components/terminal/ThemeToggle.tsx`, persisted under `maxx-theme`, seeded from
`prefers-color-scheme`. Never fork a component per theme — only tokens change.

---

## 3. Typography

Two families, no exceptions.

- **IBM Plex Sans** (`font-sans`) — page titles, prose, helper text, empty states.
- **IBM Plex Mono** (`font-mono`) — every identifier, number, label, chip, button label, key.

Loaded via `<link>` in `src/routes/__root.tsx` (never `@import` in CSS — Lightning CSS
resolves imports from disk).

| Role | Classes | Size / LH | Notes |
| --- | --- | --- | --- |
| Page title | `text-2xl font-semibold tracking-tight` | 24 / 30 | One H1 per screen |
| Section title | `font-mono text-[11px] font-semibold uppercase tracking-widest` | 11 / 16 | Panel headers, always uppercase |
| Eyebrow | `font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground` | 10 / 14 | Above the H1 only |
| Column header | `font-mono text-[10px] uppercase tracking-widest text-muted-foreground` | 10 / 14 | Alignment matches body |
| Row identity | `font-mono text-[13px] font-medium` | 13 / 18 | Strategy / instrument names |
| Row metadata | `font-mono text-[10px] uppercase tracking-wide text-muted-foreground` | 10 / 14 | One line, never a chip |
| Primary metric | `font-mono text-[22px] font-semibold tabular-nums` | 22 / 26 | KPI values, right aligned |
| Table numeric | `font-mono text-[12px] tabular-nums` | 12 / 16 | Qty, avg, LTP, bid/ask |
| Status chip | `font-mono text-[10px] font-medium uppercase tracking-wide` | 10 / 14 | Max one per row |
| Button label | `font-mono text-[11px] font-medium uppercase tracking-wide` | 11 / 16 | |
| Body / helper | `text-[13px] leading-relaxed text-muted-foreground` | 13 / 20 | Sans, sentence case |
| Micro caption | `font-mono text-[10px] text-muted-foreground` | 10 / 14 | Sub-line under a KPI |

Rules: max 3 type sizes per card · no bold on muted text · uppercase only for mono ≤ 11px ·
currency symbol never smaller than its digits.

---

## 4. Layout & spacing

- 4px base scale; use `gap-1 / 1.5 / 2 / 3`, `px-4`, `py-2.5`. Avoid odd one-offs.
- Page shell: `mx-auto max-w-[1600px] px-5 py-6`, `min-h-screen bg-background`.
- Top bar: `sticky top-0 z-20 h-14 border-b border-hairline bg-surface/90 backdrop-blur`.
- Panel: `rounded-lg border border-hairline bg-surface`; head `bg-surface-2`, `border-b`.
- Radius: `rounded` (6px) for controls and chips, `rounded-lg` for panels, `rounded-full`
  only for status dots and avatars.
- Above the fold on a 1280×800 laptop, the primary table must start within the first 380px.
  KPIs get one row — never two.
- Horizontal overflow: wrap the table in `overflow-x-auto` with a `min-w-[…]` inner div.

---

## 5. Components

### Table

```tsx
const COLS = "grid-cols-[minmax(0,1.4fr)_90px_90px_100px_110px_120px]";

<div className="overflow-x-auto rounded-lg border border-hairline bg-surface">
  <div className="min-w-[980px]">
    <div className={`grid ${COLS} gap-3 border-b border-hairline bg-surface-2 px-4 py-2
      font-mono text-[10px] uppercase tracking-widest text-muted-foreground`}>…</div>
    <div className={`grid ${COLS} items-center gap-3 border-b border-hairline px-4 py-2.5
      last:border-b-0 hover:bg-surface-2/60`}>…</div>
  </div>
</div>
```

- CSS grid, one `COLS` constant shared by head and rows — never two definitions.
- Sort in-position / at-risk rows to the top; group by underlying or strategy.
- Expanders carry per-row explanation; never repeat the same paragraph on every row.

### Chips

| Meaning | Classes |
| --- | --- |
| Live / in position | `border-profit/40 bg-profit/10 text-profit` |
| Warning / sandbox | `border-warn/40 bg-warn/10 text-warn` |
| Rejected / error | `border-loss/40 bg-loss/10 text-loss` |
| Neutral / idle | `border-hairline text-muted-foreground` |

Base: `inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[10px]
font-medium uppercase tracking-wide`. Add a `size-1.5 rounded-full` dot for live states.

### Buttons

- Primary: `rounded bg-primary px-3 py-1.5 text-primary-foreground` — one per screen.
- Secondary: `rounded border border-hairline px-3 py-1.5 hover:bg-surface-2`.
- Destructive: `rounded border border-loss/50 text-loss hover:bg-loss/10` — outline only.
- Icon button: `grid size-8 place-items-center rounded text-muted-foreground
  hover:bg-secondary hover:text-foreground` with `size-4` lucide icon.
- Max **2 visible actions per row** plus a `⋯` overflow. Icon-only actions require
  `aria-label` **and** `title`; anything destructive gets a confirm step.

### Banners

One aggregated banner per condition (`4 of 4 legs would be rejected`) with a bulk fix
action, instead of N repeated inline warnings.

---

## 6. Numbers & formatting

- Currency via `inr()` in `src/lib/mock-data.ts`: signed, `en-IN` grouping, 2 decimals.
- One display currency at a time with a ₹/$ toggle — never dual-currency strings in a cell.
- Percentages: 2 decimals with explicit sign (`-0.36%`).
- Quantities: integers, mono, right aligned. Lots shown as `10 ×10`.
- Timestamps: mono `HH:MM:SS` for intraday, `DD MMM` for expiry, uppercase.

---

## 7. States

- **Empty:** sans helper sentence + one action. No illustrations.
- **Loading:** `animate-pulse` hairline blocks matching final row height; no spinners in tables.
- **Stale / disconnected:** warn chip in the panel head plus last-update caption; never blank data.
- **Focus:** rely on `ring-ring`; never remove outlines.

---

## 8. Accessibility

- Text contrast ≥ 4.5:1 in both themes; muted text never on `surface-2` below 12px.
- Colour is never the only signal — pair with sign (`+`/`-`) or chip text.
- All interactive elements reachable by keyboard, 32px minimum hit target.
- One `<h1>` per route; each route sets its own `head()` meta.

---

## 9. Anti-patterns

- Hardcoded colour utilities (`text-white`, `bg-[#111]`) or `tailwind.config.js` theming.
- Two rows of oversized KPI cards above a table.
- Rows of 9–11 unlabelled icon buttons.
- Identical warning paragraphs repeated per row.
- Filled red buttons, `+₹0.00`, proportional digits, centre-aligned numbers.
- Serif type, purple gradients, decorative shadows.
