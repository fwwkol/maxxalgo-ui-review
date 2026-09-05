import { createFileRoute } from "@tanstack/react-router";

import { TopBar } from "@/components/terminal/TopBar";

export const Route = createFileRoute("/typography")({
  head: () => ({
    meta: [
      { title: "Typography Spec — MaxxAlgo Terminal Mockup" },
      {
        name: "description",
        content:
          "Full type scale for the MaxxAlgo terminal redesign: role, family, size, weight, tracking, colour token and where each style is used.",
      },
      { property: "og:title", content: "Typography Spec — MaxxAlgo Terminal Mockup" },
      {
        property: "og:description",
        content: "Every text role with family, px size, weight, tracking, token and usage rules.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TypographyPage,
});

type Row = {
  role: string;
  sample: string;
  cls: string;
  family: "Plex Sans" | "Plex Mono";
  size: string;
  weight: string;
  tracking: string;
  token: string;
  usage: string;
};

const rows: Row[] = [
  {
    role: "Page title",
    sample: "Open Positions",
    cls: "text-2xl font-semibold tracking-tight",
    family: "Plex Sans",
    size: "24 / 30",
    weight: "600",
    tracking: "-0.02em",
    token: "foreground",
    usage: "One H1 per screen, left of the primary action row.",
  },
  {
    role: "Section title",
    sample: "STRATEGY MONITOR",
    cls: "font-mono text-[11px] font-semibold uppercase tracking-widest",
    family: "Plex Mono",
    size: "11 / 16",
    weight: "600",
    tracking: "0.14em",
    token: "foreground",
    usage: "Card and panel headers; always uppercase, never sentence case.",
  },
  {
    role: "Breadcrumb / eyebrow",
    sample: "ALGOVERSE / ANALYTICS",
    cls: "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
    family: "Plex Mono",
    size: "10 / 14",
    weight: "400",
    tracking: "0.18em",
    token: "muted-foreground",
    usage: "Context line above the page title only.",
  },
  {
    role: "Column header",
    sample: "P&L TODAY",
    cls: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
    family: "Plex Mono",
    size: "10 / 14",
    weight: "400",
    tracking: "0.14em",
    token: "muted-foreground",
    usage: "Table heads; alignment must match the column body.",
  },
  {
    role: "Row identity",
    sample: "NIFTY_OTM15_NEXT_WEEK",
    cls: "font-mono text-[13px] font-medium",
    family: "Plex Mono",
    size: "13 / 18",
    weight: "500",
    tracking: "0",
    token: "foreground",
    usage: "Strategy and instrument names — mono so strikes line up.",
  },
  {
    role: "Row metadata",
    sample: "#18526 · BATCH · POSITIONAL · Kotak Neo",
    cls: "font-mono text-[10px] uppercase tracking-wide text-muted-foreground",
    family: "Plex Mono",
    size: "10 / 14",
    weight: "400",
    tracking: "0.04em",
    token: "muted-foreground",
    usage: "One quiet line; never a coloured chip.",
  },
  {
    role: "Primary metric",
    sample: "+₹1,969.50",
    cls: "font-mono text-[22px] font-semibold tabular-nums text-profit",
    family: "Plex Mono",
    size: "22 / 26",
    weight: "600",
    tracking: "0",
    token: "orange signal",
    usage: "KPI values. tabular-nums + right aligned, always.",
  },
  {
    role: "Table numeric",
    sample: "24,200.65",
    cls: "font-mono text-[12px] tabular-nums",
    family: "Plex Mono",
    size: "12 / 16",
    weight: "400",
    tracking: "0",
    token: "foreground",
    usage: "Qty, avg, LTP, bid/ask. Zero renders as an em dash.",
  },
  {
    role: "Status chip",
    sample: "IN POS",
    cls: "font-mono text-[10px] font-medium uppercase tracking-wide text-profit",
    family: "Plex Mono",
    size: "10 / 14",
    weight: "500",
    tracking: "0.04em",
    token: "orange signal",
    usage: "Max one coloured chip per row.",
  },
  {
    role: "Button label",
    sample: "SQUARE OFF ALL",
    cls: "font-mono text-[11px] font-medium uppercase tracking-wide",
    family: "Plex Mono",
    size: "11 / 16",
    weight: "500",
    tracking: "0.04em",
    token: "foreground / loss",
    usage: "Destructive actions use the loss token with an outline, never a fill.",
  },
  {
    role: "Body / helper",
    sample: "Verify symbols, qty and expiry before going live.",
    cls: "text-[13px] leading-relaxed text-muted-foreground",
    family: "Plex Sans",
    size: "13 / 20",
    weight: "400",
    tracking: "0",
    token: "muted-foreground",
    usage: "Explanations and empty states. Sans, sentence case.",
  },
  {
    role: "Micro caption",
    sample: "unreal +₹441.55 · real +₹1,309.75",
    cls: "font-mono text-[10px] text-muted-foreground",
    family: "Plex Mono",
    size: "10 / 14",
    weight: "400",
    tracking: "0",
    token: "muted-foreground",
    usage: "Sub-line under a KPI; one line max.",
  },
];

const COLS = "grid-cols-[150px_minmax(0,1.1fr)_88px_74px_66px_74px_120px_minmax(0,1.2fr)]";

function TypographyPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar active="Typography" />

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Design system / Type
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Typography scale</h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
          Two families only: IBM Plex Sans for prose and page titles, IBM Plex Mono for every
          identifier, number, label and chip. Numerals are always <code>tabular-nums</code> and
          right-aligned so digits stack across rows.
        </p>

        <section className="mt-5 overflow-x-auto rounded-lg border border-hairline bg-surface">
          <div className="min-w-[1180px]">
            <div
              className={`grid ${COLS} gap-3 border-b border-hairline bg-surface-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground`}
            >
              <span>Role</span>
              <span>Sample</span>
              <span>Family</span>
              <span className="text-right">Size / LH</span>
              <span className="text-right">Weight</span>
              <span className="text-right">Tracking</span>
              <span>Token</span>
              <span>Usage</span>
            </div>

            {rows.map((r) => (
              <div
                key={r.role}
                className={`grid ${COLS} items-center gap-3 border-b border-hairline px-4 py-2.5 last:border-b-0 hover:bg-surface-2/60`}
              >
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {r.role}
                </span>
                <span className={`min-w-0 truncate text-foreground ${r.cls}`}>{r.sample}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{r.family}</span>
                <span className="text-right font-mono text-[11px] tabular-nums text-foreground">{r.size}</span>
                <span className="text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                  {r.weight}
                </span>
                <span className="text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                  {r.tracking}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{r.token}</span>
                <span className="text-[12px] leading-snug text-muted-foreground">{r.usage}</span>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          Rules · max 3 type sizes per card · no bold on muted text · currency symbol never smaller
          than its digits · uppercase only for mono labels ≤ 11px.
        </p>
      </main>
    </div>
  );
}
