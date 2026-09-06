import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Briefcase,
  ClipboardCheck,
  ChevronRight,
  Layers,
  LogOut,
  MoreHorizontal,
  Shield,
  Wallet,
} from "lucide-react";

import { TopBar } from "@/components/terminal/TopBar";
import {
  AndroidGestureBar,
  AndroidStatusBar,
  MobileCard,
  MobileTabBar,
  MobileTopBar,
  type MobileTab,
} from "@/components/terminal/MobileShell";
import { MobileLogin } from "@/components/terminal/MobileLogin";
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
      { title: "Mobile Layout — Trading Terminal Mockup" },
      {
        name: "description",
        content:
          "Android phone layout for the trading terminal: thumb-reachable tab bar, stacked position cards and one-tap exit with confirmation.",
      },
      { property: "og:title", content: "Mobile Layout — Trading Terminal Mockup" },
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


type Screen = "Resolution" | "Order book" | "Holdings";

const orders = [
  { id: "OB-24191", symbol: "NIFTY 24200 CE", side: "SELL", qty: 750, price: 138.4, status: "FILLED", time: "09:20:14" },
  { id: "OB-24192", symbol: "NIFTY 24400 CE", side: "BUY", qty: 750, price: 61.25, status: "FILLED", time: "09:20:15" },
  { id: "OB-24193", symbol: "BTC 62000 PE", side: "SELL", qty: 10, price: 412.0, status: "PARTIAL", time: "10:04:52" },
  { id: "OB-24194", symbol: "CRUDEOIL 6100 CE", side: "BUY", qty: 4, price: 88.6, status: "REJECTED", time: "10:41:07" },
  { id: "OB-24195", symbol: "ETH 2600 CE", side: "SELL", qty: 8, price: 54.15, status: "PENDING", time: "11:02:33" },
];

const holdings = [
  { symbol: "RELIANCE", qty: 120, avg: 2814.5, ltp: 2902.1, pnl: 10512 },
  { symbol: "HDFCBANK", qty: 200, avg: 1642.0, ltp: 1610.4, pnl: -6320 },
  { symbol: "INFY", qty: 340, avg: 1478.9, ltp: 1521.75, pnl: 14569 },
  { symbol: "TATASTEEL", qty: 900, avg: 148.2, ltp: 148.2, pnl: 0 },
];

const resolutionLegs = [
  { side: "SELL", leg: "24200 CE", distance: "493 PTS OTM", bid: 0, ask: 0, state: "NO BID" },
  { side: "BUY", leg: "24400 CE", distance: "693 PTS OTM", bid: 0, ask: 0, state: "NO OFFER" },
  { side: "SELL", leg: "23800 PE", distance: "412 PTS OTM", bid: 0, ask: 0, state: "NO BID" },
  { side: "BUY", leg: "23600 PE", distance: "612 PTS OTM", bid: 0, ask: 0, state: "NO OFFER" },
];

const orderStateClass: Record<string, string> = {
  FILLED: "border-hairline text-muted-foreground",
  PARTIAL: "border-warn/40 bg-warn/10 text-warn",
  REJECTED: "border-loss/40 bg-loss/10 text-loss",
  PENDING: "border-hairline text-foreground",
};

function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-3 inline-flex h-9 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="size-4" /> Back · {title}
    </button>
  );
}

function ResolutionScreen({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <ScreenHeader title="Order check" onBack={onBack} />
      <div className="space-y-3">
        <MobileCard title="Iron condor · NIFTY" meta="30 JAN · SPOT 24,693 · 10×10">
          <div className="border-b border-hairline bg-warn/10 px-3 py-2.5">
            <p className="font-mono text-[11px] leading-relaxed text-warn">
              4 of 4 legs would be rejected — market orders have no bid or offer.
            </p>
            <button
              type="button"
              className="mt-2 h-9 w-full rounded border border-warn/50 font-mono text-[10px] font-medium uppercase tracking-wide text-warn hover:bg-warn/10"
            >
              Switch all to limit
            </button>
          </div>
          {resolutionLegs.map((l) => (
            <div key={l.leg} className="flex items-center gap-2 border-b border-hairline px-3 py-2.5 last:border-b-0">
              <span
                className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] font-medium ${
                  l.side === "SELL" ? "border-loss/40 bg-loss/10 text-loss" : "border-profit/40 bg-profit/10 text-profit"
                }`}
              >
                {l.side}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[12px] text-foreground">{l.leg}</p>
                <p className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                  {l.distance}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-warn">
                {l.bid.toFixed(2)} / {l.ask.toFixed(2)}
              </span>
              <span className="shrink-0 rounded border border-warn/40 px-1.5 py-0.5 font-mono text-[9px] text-warn">
                {l.state}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between gap-2 border-t border-hairline bg-surface-2 px-3 py-2">
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              Net premium <span className="tabular-nums text-foreground">₹28,650</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              Margin <span className="tabular-nums text-foreground">₹1,42,300</span>
            </span>
          </div>
        </MobileCard>
      </div>
    </div>
  );
}

function OrderBookScreen({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <ScreenHeader title="Order book" onBack={onBack} />
      <MobileCard title="Today's orders" meta={`${orders.length} orders`}>
        {orders.map((o) => (
          <div key={o.id} className="border-b border-hairline px-3 py-2.5 last:border-b-0">
            <div className="flex items-start gap-2">
              <span
                className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] font-medium ${
                  o.side === "SELL" ? "border-loss/40 bg-loss/10 text-loss" : "border-profit/40 bg-profit/10 text-profit"
                }`}
              >
                {o.side}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[13px] font-medium text-foreground">{o.symbol}</p>
                <p className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                  {o.id} · {o.time}
                </p>
              </div>
              <span
                className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] font-medium ${orderStateClass[o.status]}`}
              >
                {o.status}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                Qty <span className="tabular-nums text-foreground">{o.qty}</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                Price <span className="tabular-nums text-foreground">{num(o.price)}</span>
              </span>
              {o.status === "PENDING" || o.status === "PARTIAL" ? (
                <button
                  type="button"
                  className="ml-auto h-8 rounded border border-hairline px-2.5 font-mono text-[10px] uppercase tracking-wide text-foreground hover:bg-secondary"
                >
                  Modify
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </MobileCard>
    </div>
  );
}

function HoldingsScreen({ onBack }: { onBack: () => void }) {
  const total = holdings.reduce((a, h) => a + h.pnl, 0);
  return (
    <div>
      <ScreenHeader title="Holdings" onBack={onBack} />
      <MobileCard title="Equity holdings" meta={`${holdings.length} scrips · ${pnlText(total)}`}>
        {holdings.map((h) => (
          <div key={h.symbol} className="flex items-center gap-2 border-b border-hairline px-3 py-2.5 last:border-b-0">
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[13px] font-medium text-foreground">{h.symbol}</p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                {h.qty} qty · avg {num(h.avg)} · ltp {num(h.ltp)}
              </p>
            </div>
            <span className={`shrink-0 font-mono text-[13px] tabular-nums ${pnlClass(h.pnl)}`}>
              {pnlText(h.pnl)}
            </span>
          </div>
        ))}
      </MobileCard>
    </div>
  );
}

function MoreTab({ onOpen }: { onOpen: (screen: Screen) => void }) {
  const items: { label: string; screen?: Screen }[] = [
    { label: "Order check", screen: "Resolution" },
    { label: "Order book", screen: "Order book" },
    { label: "Holdings", screen: "Holdings" },
    { label: "Trade book" },
    { label: "Option chain" },
    { label: "Broker connections" },
    { label: "Notifications" },
    { label: "Risk limits" },
  ];
  return (
    <div className="space-y-3">
      <MobileCard title="Tools & account">
        {items.map(({ label, screen }) => (
          <button
            key={label}
            type="button"
            onClick={() => (screen ? onOpen(screen) : undefined)}
            className="flex w-full items-center gap-2 border-b border-hairline px-3 py-3 text-left last:border-b-0 hover:bg-surface-2/60"
          >
            <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground">
              {label}
            </span>
            {screen ? (
              <span className="shrink-0 font-mono text-[9px] uppercase tracking-wide text-profit">
                Open
              </span>
            ) : null}
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
  const [signedIn, setSignedIn] = useState(false);
  const [screen, setScreen] = useState<Screen | null>(null);

  return (
    <div className="min-h-screen bg-surface-2">
      <div className="hidden md:block">
        <TopBar active="Mobile" />
      </div>

      <div className="mx-auto w-full max-w-[400px] md:my-6 md:overflow-hidden md:rounded-[28px] md:border-4 md:border-foreground/80 md:shadow-xl">
        <div className="flex min-h-screen flex-col bg-background md:min-h-[800px]">
          <AndroidStatusBar />

          {!signedIn ? (
            <div className="flex flex-1 flex-col">
              <MobileLogin onSignIn={() => setSignedIn(true)} />
            </div>
          ) : (
            <>
              <MobileTopBar eyebrow="Terminal / Mobile" title={screen ?? tab} />

              <main className="flex-1 px-3 py-3">
                {screen === "Resolution" ? (
                  <ResolutionScreen onBack={() => setScreen(null)} />
                ) : screen === "Order book" ? (
                  <OrderBookScreen onBack={() => setScreen(null)} />
                ) : screen === "Holdings" ? (
                  <HoldingsScreen onBack={() => setScreen(null)} />
                ) : (
                  <>
                    {tab === "Live" && <LiveTab onExit={setConfirm} />}
                    {tab === "Positions" && <PositionsTab onExit={setConfirm} />}
                    {tab === "Strategies" && <StrategiesTab />}
                    {tab === "More" && <MoreTab onOpen={setScreen} />}
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setSignedIn(false)}
                  className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted-foreground underline-offset-2 hover:underline"
                >
                  Sign out (back to login screen)
                </button>

                <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  Android layout · 360dp width, 48dp touch targets, wide tables become stacked
                  cards, every exit asks for confirmation, and the four primary destinations sit in
                  the thumb zone.
                </p>
              </main>

              {confirm ? <ConfirmBar symbol={confirm} onCancel={() => setConfirm(null)} /> : null}

              <MobileTabBar active={tab} onChange={(t) => {
                  setScreen(null);
                  setTab(t);
                }}
                tabs={tabs} />
            </>
          )}

          <AndroidGestureBar />
        </div>
      </div>
    </div>
  );
}
