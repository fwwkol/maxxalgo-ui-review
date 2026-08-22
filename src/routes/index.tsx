import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LogOut, TrendingDown, TrendingUp } from "lucide-react";

import { TopBar } from "@/components/terminal/TopBar";
import { inr, regimes, strategies, type Strategy } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Analytics / Live — MaxxAlgo Terminal Mockup" },
      {
        name: "description",
        content:
          "Redesigned live analytics mockup for an options algo terminal: compact regime strip, single-currency P&L, and a dense strategy monitor.",
      },
      { property: "og:title", content: "Analytics / Live — MaxxAlgo Terminal Mockup" },
      {
        property: "og:description",
        content: "Compact regime strip, one-row KPIs and a dense live strategy monitor above the fold.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LiveAnalytics,
});

const statusStyle: Record<Strategy["status"], string> = {
  "IN POS": "border-profit/40 bg-profit/10 text-profit",
  IDLE: "border-hairline bg-surface-2 text-muted-foreground",
  PAUSED: "border-warn/40 bg-warn/10 text-warn",
};

function RegimeStrip() {
  return (
    <div className="grid grid-cols-2 divide-hairline overflow-hidden rounded-lg border border-hairline bg-surface md:grid-cols-4 md:divide-x">
      {regimes.map((r) => {
        const up = r.chg >= 0;
        return (
          <div key={r.symbol} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                {r.symbol}
              </p>
              <p className="font-mono text-[17px] font-medium tabular-nums text-foreground">
                {r.price}
              </p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">{r.meta}</p>
            </div>
            <span
              className={`flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[11px] font-medium tabular-nums ${
                up ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
              }`}
            >
              {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {up ? "+" : ""}
              {r.chg.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Kpi({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "profit" | "loss" | "neutral";
}) {
  return (
    <div className="border-hairline px-4 py-3 md:border-r md:last:border-r-0">
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">{label}</p>
      <p
        className={`mt-0.5 font-mono text-[22px] font-semibold tabular-nums ${
          tone === "profit" ? "text-profit" : tone === "loss" ? "text-loss" : "text-foreground"
        }`}
      >
        {value}
      </p>
      <p className="font-mono text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function LiveAnalytics() {
  const live = strategies.filter((s) => s.status === "IN POS");
  const rest = strategies.filter((s) => s.status !== "IN POS");
  const rows = [...live, ...rest];

  return (
    <div className="min-h-screen bg-surface-2 font-sans">
      <TopBar active="Live" />

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              ALGOVERSE / ANALYTICS
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              Live Analytics
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 items-center rounded border border-hairline bg-surface font-mono text-[11px]">
              <span className="bg-primary px-3 py-2 text-primary-foreground">LIVE</span>
              <span className="px-3 py-2 text-muted-foreground">HISTORY</span>
            </div>
            <div className="flex h-9 items-center rounded border border-hairline bg-surface font-mono text-[11px]">
              <span className="border-r border-hairline px-2.5 py-2 font-medium text-foreground">
                ₹ INR
              </span>
              <span className="px-2.5 py-2 text-muted-foreground">$ USD</span>
            </div>
            <button className="flex h-9 items-center gap-2 rounded border border-loss/40 bg-loss/10 px-3 font-mono text-[11px] font-medium text-loss hover:bg-loss/20">
              <LogOut className="size-3.5" /> EXIT ALL (4)
            </button>
          </div>
        </div>

        <div className="mt-4">
          <RegimeStrip />
        </div>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg border border-hairline bg-surface md:grid-cols-4">
          <Kpi label="TOTAL MTM" value="+₹1,751.30" sub="unreal +₹441.55 · real +₹1,309.75" tone="profit" />
          <Kpi label="INDIAN MARKETS" value="+₹1,668.00" sub="Kotak Neo · Upstox" tone="profit" />
          <Kpi label="DELTA EXCHANGE" value="+₹83.30" sub="≈ +$0.98" tone="profit" />
          <Kpi label="EXPOSURE" value="4 / 9" sub="strategies in position · 10 legs open" />
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-hairline bg-surface">
          <div className="flex items-center gap-2 border-b border-hairline bg-surface-2 px-4 py-2.5">
            <span className="font-mono text-[11px] font-semibold tracking-wide text-foreground">
              STRATEGY MONITOR
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-profit">
              <span className="size-1.5 animate-pulse rounded-full bg-profit" /> STREAMING
            </span>
            <Link
              to="/strategies"
              className="ml-auto flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
            >
              ALL STRATEGIES <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-[86px_1fr_110px_120px_130px_90px] items-center gap-3 border-b border-hairline px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
            <span>STATUS</span>
            <span>STRATEGY</span>
            <span className="text-right">LEGS</span>
            <span className="text-right">UNREALIZED</span>
            <span className="text-right">P&L TODAY</span>
            <span className="text-right">ACTION</span>
          </div>

          {rows.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-[86px_1fr_110px_120px_130px_90px] items-center gap-3 border-b border-hairline px-4 py-2 last:border-b-0 hover:bg-surface-2/60"
            >
              <span
                className={`rounded border px-1.5 py-0.5 text-center font-mono text-[10px] font-medium ${statusStyle[s.status]}`}
              >
                {s.status}
              </span>
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="truncate font-mono text-[13px] font-medium text-foreground">
                  {s.name}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">#{s.id}</span>
                <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                  {s.underlying} · {s.horizon}
                </span>
              </div>
              <span className="text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                {s.legs === 0 ? "—" : s.legs}
              </span>
              <span
                className={`text-right font-mono text-[12px] tabular-nums ${
                  s.pnl > 0 ? "text-profit" : s.pnl < 0 ? "text-loss" : "text-muted-foreground/60"
                }`}
              >
                {s.pnl === 0 ? "—" : inr(s.pnl)}
              </span>
              <span
                className={`text-right font-mono text-[14px] font-medium tabular-nums ${
                  s.pnl > 0 ? "text-profit" : s.pnl < 0 ? "text-loss" : "text-muted-foreground/60"
                }`}
              >
                {s.pnl === 0 ? "—" : inr(s.pnl)}
              </span>
              <div className="flex justify-end">
                {s.status === "IN POS" ? (
                  <button className="h-7 rounded border border-loss/40 bg-loss/10 px-2 font-mono text-[11px] font-medium text-loss hover:bg-loss/20">
                    EXIT
                  </button>
                ) : (
                  <button className="h-7 rounded border border-hairline px-2 font-mono text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground">
                    VIEW
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          Mockup · 8 KPI cards condensed to one regime strip + one KPI row, single display currency
          with a toggle, monitor table starts ~380px higher than today.
        </p>
      </main>
    </div>
  );
}
