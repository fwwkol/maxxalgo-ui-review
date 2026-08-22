import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ChevronDown, Info, Zap } from "lucide-react";

import { TopBar } from "@/components/terminal/TopBar";
import { num } from "@/lib/mock-data";

export const Route = createFileRoute("/resolution")({
  head: () => ({
    meta: [
      { title: "Current Resolution — MaxxAlgo Terminal Mockup" },
      {
        name: "description",
        content:
          "Restructured signal resolution table: shared context lifted to the header, one aggregated warning banner, and a compact bid/ask spread column per leg.",
      },
      { property: "og:title", content: "Current Resolution — MaxxAlgo Terminal Mockup" },
      {
        property: "og:description",
        content: "Repeated expiry/spot lifted out of rows, per-row essays replaced by one banner plus an expandable reason.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResolutionPage,
});

type Leg = {
  n: number;
  side: "SELL" | "BUY";
  right: "CE" | "PE";
  strike: number;
  lots: number;
  lotSize: number;
  ltp: number;
  bid: number;
  ask: number;
  product: string;
  order: "MARKET" | "LIMIT";
};

const EXPIRY = "17-SEP-26";
const SPOT = 8357;

const legs: Leg[] = [
  { n: 1, side: "SELL", right: "CE", strike: 8850, lots: 1, lotSize: 10, ltp: 286.75, bid: 0, ask: 0, product: "NRML", order: "MARKET" },
  { n: 2, side: "BUY", right: "CE", strike: 9350, lots: 1, lotSize: 10, ltp: 99.9, bid: 0, ask: 0, product: "NRML", order: "MARKET" },
  { n: 3, side: "SELL", right: "PE", strike: 7850, lots: 1, lotSize: 10, ltp: 221.75, bid: 0, ask: 0, product: "NRML", order: "MARKET" },
  { n: 4, side: "BUY", right: "PE", strike: 7350, lots: 1, lotSize: 10, ltp: 100, bid: 0, ask: 0, product: "NRML", order: "MARKET" },
];

const COLS = "grid-cols-[132px_minmax(0,1fr)_84px_repeat(3,72px)_104px_128px]";

function blocked(l: Leg) {
  return l.order === "MARKET" && ((l.side === "SELL" && l.bid === 0) || (l.side === "BUY" && l.ask === 0));
}

const at = legs.filter(blocked);

function LegRow({ l }: { l: Leg }) {
  const bad = blocked(l);
  const moneyness = l.right === "CE" ? l.strike - SPOT : SPOT - l.strike;

  return (
    <details className="group border-t border-hairline open:bg-surface-2/50">
      <summary
        className={`grid ${COLS} cursor-pointer list-none items-center gap-3 px-4 py-2 hover:bg-surface-2/70`}
      >
        <span className="flex items-center gap-2">
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{l.n}</span>
          <span
            className={`rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium ${
              l.side === "SELL" ? "border-loss/40 bg-loss/10 text-loss" : "border-profit/40 bg-profit/10 text-profit"
            }`}
          >
            {l.side} {l.right}
          </span>
        </span>

        <span className="flex min-w-0 items-baseline gap-2">
          <span className="font-mono text-[13px] font-medium tabular-nums text-foreground">{l.strike}</span>
          <span className="truncate font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            {Math.abs(moneyness)} pts {moneyness > 0 ? "OTM" : "ITM"}
          </span>
        </span>

        <span className="text-right font-mono text-[12px] tabular-nums text-foreground">
          {l.lots * l.lotSize}
          <span className="text-muted-foreground"> ×{l.lotSize}</span>
        </span>

        <span className="text-right font-mono text-[12px] tabular-nums text-foreground">{num(l.ltp)}</span>
        <span
          className={`text-right font-mono text-[12px] tabular-nums ${l.bid === 0 ? "text-warn" : "text-muted-foreground"}`}
        >
          {num(l.bid)}
        </span>
        <span
          className={`text-right font-mono text-[12px] tabular-nums ${l.ask === 0 ? "text-warn" : "text-muted-foreground"}`}
        >
          {num(l.ask)}
        </span>

        <span className="text-right font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          {l.product} · {l.order}
        </span>

        <span className="flex items-center justify-end gap-1.5">
          {bad ? (
            <span className="flex items-center gap-1 rounded border border-warn/40 bg-warn/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-warn">
              <AlertTriangle className="size-3" /> NO {l.side === "SELL" ? "BID" : "OFFER"}
            </span>
          ) : (
            <span className="rounded border border-profit/40 bg-profit/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-profit">
              READY
            </span>
          )}
          <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-open:rotate-180" />
        </span>
      </summary>

      <p className="flex items-start gap-2 px-4 pb-3 pl-[148px] font-mono text-[11px] leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        {bad
          ? `A MARKET ${l.side} has nothing to fill against on this strike. Move to a nearer strike or switch this leg to LIMIT.`
          : "Quote depth is sufficient for a market fill at the current spread."}
      </p>
    </details>
  );
}

function ResolutionPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar active="Resolution" />

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        <section className="overflow-hidden rounded-lg border border-hairline bg-surface">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-hairline bg-surface-2 px-4 py-3 sm:flex sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground">
                <Zap className="size-3.5 text-warn" /> Current resolution
              </p>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                {legs.length} legs · expiry <span className="text-foreground">{EXPIRY}</span> · spot{" "}
                <span className="text-foreground tabular-nums">{num(SPOT)}</span> · qty 10 (1×10)
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-profit/40 bg-profit/10 px-2.5 py-1 font-mono text-[10px] text-profit">
              LIVE · MARKET PRICES NOW
            </span>
          </div>

          {at.length > 0 && (
            <div className="flex items-start gap-2 border-b border-hairline bg-warn/10 px-4 py-2.5">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" />
              <p className="font-mono text-[11px] leading-relaxed text-foreground">
                <span className="font-medium text-warn">
                  {at.length} of {legs.length} legs would be rejected.
                </span>{" "}
                These strikes have no two-sided quotes, so a MARKET order has nothing to fill against.
                <button className="ml-2 underline decoration-dotted underline-offset-2 hover:text-warn">
                  Switch all to LIMIT
                </button>
              </p>
            </div>
          )}

          <div
            className={`grid ${COLS} gap-3 border-b border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground`}
          >
            <span>Leg</span>
            <span>Strike</span>
            <span className="text-right">Qty</span>
            <span className="text-right">LTP</span>
            <span className="text-right">Bid</span>
            <span className="text-right">Ask</span>
            <span className="text-right">Order</span>
            <span className="text-right">Status</span>
          </div>

          {legs.map((l) => (
            <LegRow key={l.n} l={l} />
          ))}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-surface-2 px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted-foreground">
              Net premium <span className="text-foreground tabular-nums">₹3,085.00</span> · margin{" "}
              <span className="text-foreground tabular-nums">₹1,42,600</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              Verify symbols, qty and expiry before going live
            </span>
          </div>
        </section>

        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
          Restructure · repeated expiry/spot/qty lifted into the header, four identical warning
          paragraphs collapsed into one banner with a bulk fix, per-leg reason moved behind a row
          expander, strike distance replaces raw spot, and bid/ask zeros are tinted instead of
          shouted. Row height drops from ~66px to 34px.
        </p>
      </main>
    </div>
  );
}
