import { createFileRoute, Link } from "@tanstack/react-router";

import { TopBar } from "@/components/terminal/TopBar";

export const Route = createFileRoute("/styleguide")({
  head: () => ({
    meta: [
      { title: "UI Style Guide — MaxxAlgo Terminal" },
      {
        name: "description",
        content:
          "Full UI styling guide for the MaxxAlgo terminal: colour tokens, type scale, layout grid, table, chip and button patterns, number formatting, states and anti-patterns.",
      },
      { property: "og:title", content: "UI Style Guide — MaxxAlgo Terminal" },
      {
        property: "og:description",
        content:
          "Tokens, density rules, component recipes and anti-patterns for the MaxxAlgo trading terminal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StyleGuidePage,
});

const chipBase =
  "inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wide";

const tokens: { name: string; utility: string; swatch: string; use: string }[] = [
  { name: "background", utility: "bg-background", swatch: "bg-background", use: "Page canvas" },
  { name: "surface", utility: "bg-surface", swatch: "bg-surface", use: "Panels, cards, top bar" },
  { name: "surface-2", utility: "bg-surface-2", swatch: "bg-surface-2", use: "Table heads, hover, inputs" },
  { name: "hairline", utility: "border-hairline", swatch: "bg-hairline", use: "Every divider and border" },
  { name: "foreground", utility: "text-foreground", swatch: "bg-foreground", use: "Identities and values" },
  { name: "muted-foreground", utility: "text-muted-foreground", swatch: "bg-muted-foreground", use: "Labels, metadata" },
  { name: "accent-orange", utility: "the one signal hue", swatch: "bg-primary", use: "Every status and action colour" },
  { name: "profit / loss / warn", utility: "text-profit · text-loss · text-warn", swatch: "bg-profit", use: "Financial state, all one orange" },
  { name: "primary", utility: "bg-primary", swatch: "bg-primary", use: "Avatar, focus ring, single CTA" },

];

const scale: { role: string; sample: string; cls: string; spec: string }[] = [
  { role: "Page title", sample: "Open Positions", cls: "text-2xl font-semibold tracking-tight", spec: "Sans 24/30 · 600" },
  { role: "Section title", sample: "STRATEGY MONITOR", cls: "font-mono text-[11px] font-semibold uppercase tracking-widest", spec: "Mono 11/16 · 600" },
  { role: "Eyebrow", sample: "ALGOVERSE / ANALYTICS", cls: "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground", spec: "Mono 10/14 · 400" },
  { role: "Row identity", sample: "NIFTY_OTM15_NEXT_WEEK", cls: "font-mono text-[13px] font-medium", spec: "Mono 13/18 · 500" },
  { role: "Primary metric", sample: "+₹1,969.50", cls: "font-mono text-[22px] font-semibold tabular-nums text-profit", spec: "Mono 22/26 · 600" },
  { role: "Table numeric", sample: "24,200.65", cls: "font-mono text-[12px] tabular-nums", spec: "Mono 12/16 · 400" },
  { role: "Body / helper", sample: "Verify symbols, qty and expiry before going live.", cls: "text-[13px] leading-relaxed text-muted-foreground", spec: "Sans 13/20 · 400" },
  { role: "Micro caption", sample: "unreal +₹441.55 · real +₹1,309.75", cls: "font-mono text-[10px] text-muted-foreground", spec: "Mono 10/14 · 400" },
];

function Panel({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-hairline bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-2 px-4 py-2">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground">
          {title}
        </h2>
        {meta ? (
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{meta}</span>
        ) : null}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground">
      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground" />
      <span>{children}</span>
    </li>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded border border-hairline bg-surface-2 px-1 py-0.5 font-mono text-[11px] text-foreground">
      {children}
    </code>
  );
}

function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar active="Style guide" />

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Design system / Full guide
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">UI styling guide</h1>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          A trading terminal is read, not browsed. Everything below exists so numbers stay
          comparable across rows and destructive actions are never clicked by accident. The full
          written spec lives in <Code>docs/UI-STYLE-GUIDE.md</Code>; the type table is on{" "}
          <Link to="/typography" className="text-foreground underline decoration-hairline underline-offset-2">
            /typography
          </Link>
          .
        </p>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Panel title="Principles" meta="Non-negotiable">
            <ul className="space-y-2">
              <Rule>Density over decoration — rows 32–36px, no shadows, no gradients.</Rule>
              <Rule>One colour claim per row: status chip only, metadata stays muted mono.</Rule>
              <Rule>
                Every numeric column is <Code>font-mono tabular-nums text-right</Code>.
              </Rule>
              <Rule>
                Flat values render as <Code>—</Code>, never <Code>+₹0.00</Code>.
              </Rule>
              <Rule>Shared context (expiry, spot, qty) lives in the panel header, not in each row.</Rule>
              <Rule>Destructive actions are outlined, never filled, and always confirm.</Rule>
              <Rule>Primary table starts within the first 380px — KPIs get one row only.</Rule>
            </ul>
          </Panel>

          <Panel title="Colour tokens" meta="src/styles.css · oklch">
            <div className="space-y-1.5">
              {tokens.map((t) => (
                <div key={t.name} className="grid grid-cols-[28px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-3">
                  <span className={`size-5 rounded border border-hairline ${t.swatch}`} />
                  <span className="font-mono text-[11px] text-foreground">{t.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{t.utility}</span>
                  <span className="text-[12px] leading-snug text-muted-foreground">{t.use}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
              Tinted containers use exactly <Code>border-x/40 bg-x/10 text-x</Code>. Never hardcode
              <Code>text-white</Code>, <Code>bg-black</Code> or hex values in components. Dark mode
              swaps token values only — never fork a component per theme.
            </p>
          </Panel>

          <Panel title="Type scale" meta="Plex Sans + Plex Mono">
            <div className="space-y-2">
              {scale.map((s) => (
                <div key={s.role} className="grid grid-cols-[110px_minmax(0,1fr)_120px] items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    {s.role}
                  </span>
                  <span className={`min-w-0 truncate text-foreground ${s.cls}`}>{s.sample}</span>
                  <span className="text-right font-mono text-[10px] text-muted-foreground">{s.spec}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
              Max 3 type sizes per card · no bold on muted text · uppercase only for mono ≤ 11px ·
              currency symbol never smaller than its digits.
            </p>
          </Panel>

          <Panel title="Chips & buttons" meta="Max 2 row actions + ⋯">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`${chipBase} border-profit/40 bg-profit/10 text-profit`}>
                <span className="size-1.5 rounded-full bg-profit" />
                IN POS
              </span>
              <span className={`${chipBase} border-warn/40 bg-warn/10 text-warn`}>
                <span className="size-1.5 rounded-full bg-warn" />
                SANDBOX
              </span>
              <span className={`${chipBase} border-loss/40 bg-loss/10 text-loss`}>NO BID</span>
              <span className={`${chipBase} border-hairline text-muted-foreground`}>IDLE</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button className="rounded bg-primary px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wide text-primary-foreground">
                Deploy
              </button>
              <button className="rounded border border-hairline px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wide text-foreground hover:bg-surface-2">
                View
              </button>
              <button className="rounded border border-loss/50 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wide text-loss hover:bg-loss/10">
                Square off all
              </button>
              <button
                aria-label="More actions"
                title="More actions"
                className="grid size-8 place-items-center rounded font-mono text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                ⋯
              </button>
            </div>

            <ul className="mt-4 space-y-2">
              <Rule>One primary CTA per screen; destructive is outline-only in the loss token.</Rule>
              <Rule>
                Icon-only controls need both <Code>aria-label</Code> and <Code>title</Code>.
              </Rule>
              <Rule>Never more than two visible row actions — the rest go behind the overflow.</Rule>
            </ul>
          </Panel>

          <Panel title="Layout & grid" meta="4px scale">
            <ul className="space-y-2">
              <Rule>
                Shell: <Code>min-h-screen bg-background</Code> +{" "}
                <Code>mx-auto max-w-[1600px] px-5 py-6</Code>.
              </Rule>
              <Rule>
                Top bar: <Code>sticky top-0 z-20 h-14 border-b border-hairline bg-surface/90 backdrop-blur</Code>.
              </Rule>
              <Rule>
                Panel: <Code>rounded-lg border border-hairline bg-surface</Code>, head on{" "}
                <Code>bg-surface-2</Code>.
              </Rule>
              <Rule>
                Radius: <Code>rounded</Code> for controls and chips, <Code>rounded-lg</Code> for
                panels, <Code>rounded-full</Code> only for dots and avatars.
              </Rule>
              <Rule>
                Tables are CSS grid with a single shared <Code>COLS</Code> constant for head and
                rows, wrapped in <Code>overflow-x-auto</Code> with an inner <Code>min-w-[…]</Code>.
              </Rule>
              <Rule>Row padding <Code>px-4 py-2.5</Code>, hover <Code>hover:bg-surface-2/60</Code>.</Rule>
            </ul>
          </Panel>

          <Panel title="Numbers, states & a11y">
            <ul className="space-y-2">
              <Rule>
                Currency via <Code>inr()</Code> — signed, <Code>en-IN</Code> grouping, 2 decimals.
                One display currency at a time with a ₹/$ toggle.
              </Rule>
              <Rule>Percentages carry an explicit sign; quantities are integers, right aligned.</Rule>
              <Rule>Empty state: one sans sentence plus one action. No illustrations.</Rule>
              <Rule>
                Loading: <Code>animate-pulse</Code> hairline blocks at final row height, never
                spinners inside tables.
              </Rule>
              <Rule>Stale data keeps the last value and adds a warn chip with a timestamp.</Rule>
              <Rule>Contrast ≥ 4.5:1 in both themes; colour is never the only signal.</Rule>
              <Rule>One H1 per route, each route sets its own head meta.</Rule>
            </ul>
          </Panel>

          <Panel title="Anti-patterns" meta="Reject on review">
            <ul className="space-y-2">
              <Rule>Hardcoded colour utilities or hex values in components.</Rule>
              <Rule>Two rows of oversized KPI cards pushing the table below the fold.</Rule>
              <Rule>Rows of 9–11 unlabelled icon buttons.</Rule>
              <Rule>The same warning paragraph repeated on every row instead of one banner.</Rule>
              <Rule>
                Filled red buttons, <Code>+₹0.00</Code>, proportional digits, centred numbers.
              </Rule>
              <Rule>Serif type, purple gradients, decorative shadows.</Rule>
            </ul>
          </Panel>
        </div>
      </main>
    </div>
  );
}
