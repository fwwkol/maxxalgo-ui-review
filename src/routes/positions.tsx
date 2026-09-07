import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, LogOut, MoreHorizontal, Shield } from "lucide-react";

import { TopBar } from "@/components/terminal/TopBar";
import { groupByStrategy, inr, num, positions, type Position } from "@/lib/mock-data";

export const Route = createFileRoute("/positions")({
  head: () => ({
    meta: [
      { title: "Positions — MaxxAlgo Terminal Mockup" },
      {
        name: "description",
        content:
          "Redesigned positions blotter mockup: legs grouped by strategy, right-aligned mono numerics, and net-exposure summary above the fold.",
      },
      { property: "og:title", content: "Positions — MaxxAlgo Terminal Mockup" },
      {
        property: "og:description",
        content: "Legs grouped by strategy with per-strategy P&L, mono numeric columns and one exit action per row.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PositionsPage,
});

const total = positions.reduce((a, p) => a + p.pnl, 0);
const winners = positions.filter((p) => p.pnl > 0).length;
const groups = groupByStrategy(positions);

function pnlClass(n: number) {
  return n > 0 ? "text-profit" : n < 0 ? "text-loss" : "text-muted-foreground";
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-1 font-mono text-[15px] tabular-nums ${tone ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}

function Row({ p }: { p: Position }) {
  return (
    <div className="grid min-h-[92px] grid-cols-1 items-center gap-2 border-t border-hairline px-4 py-2 hover:bg-surface-2/70 sm:h-[46px] sm:min-h-0 sm:grid-cols-[minmax(0,1fr)_repeat(4,88px)_120px] sm:gap-3 sm:py-0">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium ${
            p.side === "SELL" ? "border-loss/40 bg-loss/10 text-loss" : "border-profit/40 bg-profit/10 text-profit"
          }`}
        >
          {p.side}
        </span>
        <span className="truncate font-mono text-[13px] text-foreground">{p.symbol}</span>
        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted-foreground sm:inline">
          {p.expiry} · {p.broker}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:contents">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground sm:text-right sm:text-[12px] sm:normal-case sm:tracking-normal sm:text-foreground"><span className="block sm:hidden">Qty</span>{p.qty}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground sm:text-right sm:text-[12px] sm:normal-case sm:tracking-normal"><span className="block sm:hidden">Avg</span>{num(p.avg)}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground sm:text-right sm:text-[12px] sm:normal-case sm:tracking-normal sm:text-foreground"><span className="block sm:hidden">LTP</span>{num(p.ltp)}</span>
        <span className={`font-mono text-[10px] uppercase tracking-wide sm:text-right sm:text-[13px] sm:normal-case sm:tracking-normal ${pnlClass(p.pnl)}`}><span className="block text-muted-foreground sm:hidden">P&amp;L</span>{p.pnl === 0 ? "—" : inr(p.pnl)}</span>
      </div>
      <div className="flex items-center justify-end gap-1.5 sm:justify-end">
        <button className="inline-flex items-center gap-1.5 rounded border border-loss/40 px-2 py-1 font-mono text-[11px] text-loss hover:bg-loss/10">
          <LogOut className="size-3" /> EXIT
        </button>
        <button
          aria-label="More actions"
          className="grid size-7 place-items-center rounded border border-hairline text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function PositionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar active="Positions" />

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Portfolio / Positions
        </p>
        <div className="mt-1 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Open Positions
            </h1>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              {positions.length} legs · {groups.length} strategies · {winners} in profit
            </p>
          </div>
          <button className="inline-flex shrink-0 items-center gap-2 rounded border border-loss/40 px-3 py-2 font-mono text-[11px] font-medium text-loss hover:bg-loss/10">
            <Shield className="size-3.5" /> SQUARE OFF ALL
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 divide-hairline overflow-hidden rounded-lg border border-hairline bg-surface md:grid-cols-4 md:divide-x">
          <Kpi label="Net P&L" value={inr(total)} tone={pnlClass(total)} />
          <Kpi label="Realised" value="—" />
          <Kpi label="Margin used" value="₹4,86,220" />
          <Kpi label="Exposure" value="1.94x" tone="text-warn" />
        </div>

        <section className="mt-5 overflow-hidden rounded-lg border border-hairline bg-surface">
          <div className="hidden grid-cols-[minmax(0,1fr)_repeat(4,88px)_120px] gap-3 bg-surface-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:grid">
            <span>Instrument</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Avg</span>
            <span className="text-right">LTP</span>
            <span className="text-right">P&amp;L</span>
            <span className="text-right">Actions</span>
          </div>

          {groups.map(([strategy, legs]) => {
            const sum = legs.reduce((a, l) => a + l.pnl, 0);
            return (
              <div key={strategy}>
                <div className="flex items-center justify-between gap-3 border-t border-hairline bg-surface-2/60 px-4 py-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate font-mono text-[12px] font-medium text-foreground">{strategy}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      {legs.length} legs
                    </span>
                  </span>
                  <span className={`font-mono text-[12px] tabular-nums ${pnlClass(sum)}`}>{inr(sum)}</span>
                </div>
                {legs.map((p) => (
                  <Row key={p.symbol + p.strategy} p={p} />
                ))}
              </div>
            );
          })}
        </section>

        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          Mockup · legs grouped under their strategy, numerics mono + tabular and right-aligned, one primary EXIT per row.
        </p>
      </main>
    </div>
  );
}
