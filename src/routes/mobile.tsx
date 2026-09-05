import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ChevronRight,
  Layers,
  LogOut,
  MoreHorizontal,
  Shield,
  Wallet,
} from "lucide-react";

import { TopBar } from "@/components/terminal/TopBar";
import {
  MobileCard,
  MobileTabBar,
  MobileTopBar,
  type MobileTab,
} from "@/components/terminal/MobileShell";
import {
  groupByStrategy,
  inr,
  num,
  positions,
  regimes,
  strategies,
  type Position,
  type Strategy,
} from "@/lib/mock-data";

export const Route = createFileRoute("/mobile")({
  head: () => ({
    meta: [
      { title: "Mobile Layout — Openbull Terminal" },
      {
        name: "description",
        content:
          "Phone layout for the Openbull trading terminal: thumb-reachable tab bar, stacked position cards and one-tap exit with confirmation.",
      },
      { property: "og:title", content: "Mobile Layout — Openbull Terminal" },
      {
        property: "og:description",
        content:
          "A phone-first terminal: compact market strip, stacked cards instead of wide tables, and a four-tab bottom bar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MobileLayoutPage,
});

const tabs: { id: MobileTab; label: string; icon: React.ReactNode }[] = [
  { id: "Live", label: "Live", icon: <Activity className="size-4" /> },
  { id: "Positions", label: "Positions", icon: <Wallet className="size-4" /> },
  { id: "Strategies", label: "Strategies", icon: <Layers className="size-4" /> },
  { id: "More", label: "More", icon: <MoreHorizontal className="size-4" /> },
];

const statusChip: Record<Strategy["status"], string> = {
  "IN POS": "border-profit/40 bg-profit/10 text-profit",
  IDLE: "border-hairline text-muted-foreground",
  PAUSED: "border-warn/40 bg-warn/10 text-warn",
};

function pnlClass(n: number) {
  return n > 0 ? "text-profit" : n < 0 ? "text-loss" : "text-muted-foreground";
}

function pnlText(n: number) {
  return n === 0 ? "—" : inr(n);
}

function MarketStrip() {
  return (
    <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1">
      {regimes.map((r) => (
        <div
          key={r.symbol}
          className="min-w-[132px] shrink-0 rounded-lg border border-hairline bg-surface px-3 py-2"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            {r.symbol}
          </p>
          <p className="font-mono text-[15px] font-medium tabular-nums text-foreground">{r.price}</p>
          <p className={`font-mono text-[10px] tabular-nums ${r.chg >= 0 ? "text-profit" : "text-loss"}`}>
            {r.chg >= 0 ? "+" : ""}
            {r.chg.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
}

function KpiRow() {
  const total = positions.reduce((a, p) => a + p.pnl, 0);
  return (
    <div className="grid grid-cols-2 divide-x divide-hairline overflow-hidden rounded-lg border border-hairline bg-surface">
      <div className="px-3 py-2.5">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          Total MTM
        </p>
        <p className={`font-mono text-[19px] font-semibold tabular-nums ${pnlClass(total)}`}>
          {pnlText(total)}
        </p>
        <p className="font-mono text-[9px] text-muted-foreground">unreal +₹441.55</p>
      </div>
      <div className="px-3 py-2.5">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          Exposure
        </p>
        <p className="font-mono text-[19px] font-semibold tabular-nums text-foreground">4 / 9</p>
        <p className="font-mono text-[9px] text-muted-foreground">{positions.length} legs open</p>
      </div>
    </div>
  );
}

function PositionCard({ p, onExit }: { p: Position; onExit: (symbol: string) => void }) {
  return (
    <div className="border-b border-hairline px-3 py-2.5 last:border-b-0">
      <div className="flex items-start gap-2">
        <span
          className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] font-medium ${
            p.side === "SELL"
              ? "border-loss/40 bg-loss/10 text-loss"
              : "border-profit/40 bg-profit/10 text-profit"
          }`}
        >
          {p.side}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[13px] font-medium text-foreground">{p.symbol}</p>
          <p className="truncate font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
            {p.expiry} · {p.broker}
          </p>
        </div>
        <span className={`shrink-0 font-mono text-[14px] tabular-nums ${pnlClass(p.pnl)}`}>
          {pnlText(p.pnl)}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Qty <span className="tabular-nums text-foreground">{p.qty}</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Avg <span className="tabular-nums text-foreground">{num(p.avg)}</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          LTP <span className="tabular-nums text-foreground">{num(p.ltp)}</span>
        </span>
        <button
          type="button"
          onClick={() => onExit(p.symbol)}
          className="ml-auto inline-flex h-8 items-center gap-1.5 rounded border border-loss/50 px-2.5 font-mono text-[10px] font-medium uppercase tracking-wide text-loss hover:bg-loss/10"
        >
          <LogOut className="size-3" /> Exit
        </button>
      </div>
    </div>
  );
}

function ConfirmBar({
  symbol,
  onCancel,
}: {
  symbol: string;
  onCancel: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-10 border-t border-hairline bg-loss/10 px-3 py-2.5">
      <p className="font-mono text-[11px] leading-relaxed text-foreground">
        Square off <span className="font-medium text-loss">{symbol}</span> at market?
      </p>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 flex-1 rounded border border-hairline font-mono text-[10px] font-medium uppercase tracking-wide text-foreground hover:bg-surface-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-9 flex-1 rounded border border-loss/50 font-mono text-[10px] font-medium uppercase tracking-wide text-loss hover:bg-loss/10"
        >
          Confirm exit
        </button>
      </div>
    </div>
  );
}

function LiveTab({ onExit }: { onExit: (symbol: string) => void }) {
  const live = positions.slice(0, 3);
  return (
    <div className="space-y-3">
      <MarketStrip />
      <KpiRow />
      <MobileCard title="Top movers" meta="Live">
        {live.map((p) => (
          <PositionCard key={p.symbol} p={p} onExit={onExit} />
        ))}
      </MobileCard>
    </div>
  );
}

function PositionsTab({ onExit }: { onExit: (symbol: string) => void }) {
  const groups = groupByStrategy(positions);
  return (
    <div className="space-y-3">
      <KpiRow />
      {groups.map(([strategy, legs]) => {
        const sum = legs.reduce((a, l) => a + l.pnl, 0);
        return (
          <MobileCard key={strategy} title={strategy} meta={`${legs.length} legs · ${pnlText(sum)}`}>
            {legs.map((p) => (
              <PositionCard key={p.symbol} p={p} onExit={onExit} />
            ))}
          </MobileCard>
        );
      })}
    </div>
  );
}

function StrategiesTab() {
  return (
    <MobileCard title="All strategies" meta={`${strategies.length} total`}>
      {strategies.map((s) => (
        <button
          key={s.id}
          type="button"
          className="flex w-full items-center gap-2 border-b border-hairline px-3 py-2.5 text-left last:border-b-0 hover:bg-surface-2/60"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[13px] font-medium text-foreground">{s.name}</p>
            <p className="truncate font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
              #{s.id} · {s.underlying} · {s.horizon}
            </p>
          </div>
          <span
            className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] font-medium ${statusChip[s.status]}`}
          >
            {s.status}
          </span>
          <span className={`w-[78px] shrink-0 text-right font-mono text-[12px] tabular-nums ${pnlClass(s.pnl)}`}>
            {pnlText(s.pnl)}
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
      ))}
    </MobileCard>
  );
}

function MoreTab() {
  const items = [
    "Order book",
    "Trade book",
    "Holdings",
    "Option chain",
    "Broker connections",
    "Notifications",
    "Risk limits",
  ];
  return (
    <div className="space-y-3">
      <MobileCard title="Tools & account">
        {items.map((label) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center gap-2 border-b border-hairline px-3 py-3 text-left last:border-b-0 hover:bg-surface-2/60"
          >
            <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground">
              {label}
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        ))}
      </MobileCard>

      <button
        type="button"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded border border-loss/50 font-mono text-[11px] font-medium uppercase tracking-wide text-loss hover:bg-loss/10"
      >
        <Shield className="size-3.5" /> Square off everything
      </button>
    </div>
  );
}

function MobileLayoutPage() {
  const [tab, setTab] = useState<MobileTab>("Live");
  const [confirm, setConfirm] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-surface-2">
      <div className="hidden md:block">
        <TopBar active="Mobile" />
      </div>

      <div className="mx-auto w-full max-w-[420px] md:my-6 md:overflow-hidden md:rounded-2xl md:border md:border-hairline md:shadow-sm">
        <div className="flex min-h-screen flex-col bg-background md:min-h-[760px]">
          <MobileTopBar eyebrow="Openbull / Mobile" title={tab} />

          <main className="flex-1 px-3 py-3">
            {tab === "Live" && <LiveTab onExit={setConfirm} />}
            {tab === "Positions" && <PositionsTab onExit={setConfirm} />}
            {tab === "Strategies" && <StrategiesTab />}
            {tab === "More" && <MoreTab />}

            <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-foreground">
              Phone layout · wide tables become stacked cards, numbers stay mono and right aligned,
              every exit asks for confirmation, and the four primary destinations sit in the thumb
              zone.
            </p>
          </main>

          {confirm ? <ConfirmBar symbol={confirm} onCancel={() => setConfirm(null)} /> : null}

          <MobileTabBar active={tab} onChange={setTab} tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
