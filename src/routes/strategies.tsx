import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  Copy,
  Eye,
  Layers,
  LogOut,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Radio,
  Search,
  Trash2,
} from "lucide-react";

import { TopBar } from "@/components/terminal/TopBar";
import { groupByUnderlying, inr, strategies, type Strategy } from "@/lib/mock-data";

export const Route = createFileRoute("/strategies")({
  head: () => ({
    meta: [
      { title: "All Strategies — MaxxAlgo Terminal Mockup" },
      {
        name: "description",
        content:
          "Redesigned strategy roster mockup: grouped by underlying, two primary actions per row, and a single status chip.",
      },
      { property: "og:title", content: "All Strategies — MaxxAlgo Terminal Mockup" },
      {
        property: "og:description",
        content: "Denser strategy list with collapsed row actions and quieter tag hierarchy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategiesPage,
});

const statusStyle: Record<Strategy["status"], string> = {
  "IN POS": "border-profit/40 bg-profit/10 text-profit",
  IDLE: "border-hairline bg-surface-2 text-muted-foreground",
  PAUSED: "border-warn/40 bg-warn/10 text-warn",
};

function PnL({ value, legs }: { value: number; legs: number }) {
  if (value === 0) {
    return (
      <div className="text-right font-mono text-[13px] text-muted-foreground/60">
        —<div className="text-[10px] tracking-wide">FLAT TODAY</div>
      </div>
    );
  }
  return (
    <div className="text-right">
      <div
        className={`font-mono text-[15px] font-medium tabular-nums ${
          value > 0 ? "text-profit" : "text-loss"
        }`}
      >
        {inr(value)}
      </div>
      <div className="font-mono text-[10px] tracking-wide text-muted-foreground">
        LIVE · {legs} LEGS
      </div>
    </div>
  );
}

function RowActions({ status }: { status: Strategy["status"] }) {
  return (
    <div className="flex items-center gap-1.5">
      <button className="flex h-7 items-center gap-1.5 rounded border border-hairline bg-surface px-2 font-mono text-[11px] text-foreground hover:bg-secondary">
        <Eye className="size-3.5" /> VIEW
      </button>
      {status === "IN POS" ? (
        <button className="flex h-7 items-center gap-1.5 rounded border border-loss/40 bg-loss/10 px-2 font-mono text-[11px] font-medium text-loss hover:bg-loss/20">
          <LogOut className="size-3.5" /> EXIT
        </button>
      ) : status === "PAUSED" ? (
        <button className="flex h-7 items-center gap-1.5 rounded border border-profit/40 bg-profit/10 px-2 font-mono text-[11px] font-medium text-profit hover:bg-profit/20">
          <Play className="size-3.5" /> RESUME
        </button>
      ) : (
        <button className="flex h-7 items-center gap-1.5 rounded border border-hairline bg-surface px-2 font-mono text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground">
          <Pause className="size-3.5" /> ARM
        </button>
      )}
      <div className="relative group">
        <button
          aria-label="More actions"
          className="grid size-7 place-items-center rounded border border-hairline text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
        <div className="pointer-events-none absolute right-0 top-8 z-10 w-40 origin-top-right scale-95 rounded-md border border-hairline bg-surface p-1 opacity-0 shadow-lg transition group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
          {[
            { icon: BarChart3, label: "Analytics" },
            { icon: Copy, label: "Clone" },
            { icon: Radio, label: "Alerts" },
            { icon: Trash2, label: "Delete", danger: true },
          ].map(({ icon: Icon, label, danger }) => (
            <button
              key={label}
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-[11px] hover:bg-secondary ${
                danger ? "text-loss" : "text-foreground"
              }`}
            >
              <Icon className="size-3.5" /> {label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StrategiesPage() {
  const [query, setQuery] = useState("");
  const groups = useMemo(
    () =>
      groupByUnderlying(
        strategies.filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            String(s.id).includes(query) ||
            s.underlying.toLowerCase().includes(query.toLowerCase()),
        ),
      ),
    [query],
  );

  return (
    <div className="min-h-screen bg-surface-2 font-sans">
      <TopBar active="Strategies" />

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              ALGOVERSE / STRATEGIES
            </p>
            <h1 className="mt-1 flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-foreground">
              All Strategies
              <span className="flex items-center gap-1.5 rounded-full border border-profit/40 bg-profit/10 px-2 py-0.5 font-mono text-[10px] font-medium text-profit">
                <span className="size-1.5 animate-pulse rounded-full bg-profit" />
                STREAM LIVE
              </span>
            </h1>
            <p className="mt-1 text-[13px] text-muted-foreground">
              9 strategies · 4 in position · multi-leg options with per-leg and strategy-level risk
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex h-9 items-center gap-2 rounded border border-hairline bg-surface px-3 font-mono text-[11px] text-foreground hover:bg-secondary">
              <BarChart3 className="size-3.5" /> ANALYTICS
            </button>
            <button className="flex h-9 items-center gap-2 rounded border border-loss/40 bg-loss/10 px-3 font-mono text-[11px] font-medium text-loss hover:bg-loss/20">
              <LogOut className="size-3.5" /> EXIT ALL (4)
            </button>
            <button className="flex h-9 items-center gap-2 rounded bg-primary px-3 font-mono text-[11px] font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="size-3.5" /> NEW STRATEGY
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <label className="flex h-9 w-80 items-center gap-2 rounded border border-hairline bg-surface px-3">
            <Search className="size-3.5 text-muted-foreground" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, #id or underlying…"
              className="w-full bg-transparent font-mono text-xs outline-none placeholder:text-muted-foreground"
            />
          </label>
          {["ALL 9", "IN POSITION 4", "IDLE 4", "PAUSED 1"].map((chip, i) => (
            <button
              key={chip}
              className={`h-9 rounded border px-3 font-mono text-[11px] ${
                i === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-hairline bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
          <div className="ml-auto flex h-9 items-center rounded border border-hairline bg-surface font-mono text-[11px]">
            <span className="border-r border-hairline px-3 py-2 text-muted-foreground">GROUPED</span>
            <span className="px-3 py-2 text-foreground">LIST</span>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-hairline bg-surface">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-hairline bg-surface-2 px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-muted-foreground sm:grid-cols-[1fr_auto_auto]">
            <span>STRATEGY</span>
            <span className="text-right">P&L TODAY</span>
            <span className="hidden w-[220px] text-right sm:block">ACTIONS</span>
          </div>

          {groups.map(([underlying, rows]) => {
            const total = rows.reduce((sum, r) => sum + r.pnl, 0);
            return (
              <section key={underlying}>
                <div className="flex items-center gap-2 border-y border-hairline bg-surface-2/70 px-4 py-2">
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                  <span className="font-mono text-[11px] font-semibold tracking-wide text-foreground">
                    {underlying}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {rows.length} {rows.length === 1 ? "strategy" : "strategies"}
                  </span>
                  <span
                    className={`ml-auto font-mono text-[12px] font-medium tabular-nums ${
                      total > 0 ? "text-profit" : total < 0 ? "text-loss" : "text-muted-foreground"
                    }`}
                  >
                    {total === 0 ? "—" : inr(total)}
                  </span>
                </div>

                {rows.map((s) => (
                  <div
                    key={s.id}
                    className="grid grid-cols-1 items-center gap-2 border-b border-hairline px-4 py-2.5 last:border-b-0 hover:bg-surface-2/60 sm:grid-cols-[1fr_auto_auto] sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`w-[74px] shrink-0 rounded border px-1.5 py-0.5 text-center font-mono text-[10px] font-medium ${statusStyle[s.status]}`}
                      >
                        {s.status}
                      </span>
                      <Layers className="size-3.5 shrink-0 text-muted-foreground/70" aria-hidden />
                      <span className="truncate font-mono text-[13px] font-medium text-foreground">
                        {s.name}
                      </span>
                      <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">#{s.id}</span>
                      <span className="hidden truncate font-mono text-[10px] tracking-wide text-muted-foreground sm:inline">
                        {s.kind} · {s.horizon} · {s.broker}
                      </span>
                    </div>
                    <PnL value={s.pnl} legs={s.legs} />
                    <div className="flex w-full justify-end sm:w-[220px]">
                      <RowActions status={s.status} />
                    </div>
                  </div>
                ))}
              </section>
            );
          })}
        </div>

        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          Mockup · one colored chip per row (status only), two primary actions plus overflow menu,
          flat P&L muted to dashes, row height reduced from 76px to 46px.
        </p>
      </main>
    </div>
  );
}
