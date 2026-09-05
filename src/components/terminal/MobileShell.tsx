import type { ReactNode } from "react";
import { BatteryFull, Bell, Search, Wifi } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";

export type MobileTab = "Live" | "Positions" | "Strategies" | "More";

export function MobileTopBar({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-surface/95 backdrop-blur">
      <div className="flex h-12 items-center gap-2 px-3">
        <span className="font-mono text-[13px] font-semibold tracking-tight text-foreground">
          Maxx<span className="text-profit">Algo</span>
        </span>
        <span className="ml-1 flex items-center gap-1 rounded border border-warn/40 bg-warn/10 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide text-warn">
          <span className="size-1 rounded-full bg-warn" />
          Sandbox
        </span>

        <div className="ml-auto flex items-center gap-0.5">
          <button
            aria-label="Search symbols"
            title="Search symbols"
            className="grid size-9 place-items-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Search className="size-4" />
          </button>
          <button
            aria-label="Notifications"
            title="Notifications"
            className="grid size-9 place-items-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Bell className="size-4" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-baseline gap-2 border-t border-hairline px-3 py-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </span>
        <h1 className="ml-auto truncate font-mono text-[13px] font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
    </header>
  );
}

export function MobileTabBar({
  active,
  onChange,
  tabs,
}: {
  active: MobileTab;
  onChange: (tab: MobileTab) => void;
  tabs: { id: MobileTab; label: string; icon: ReactNode }[];
}) {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-hairline bg-surface/95 backdrop-blur"
    >
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-current={on ? "page" : undefined}
            className={`flex h-14 flex-col items-center justify-center gap-1 font-mono text-[9px] uppercase tracking-wide transition-colors ${
              on ? "text-profit" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

export function MobileCard({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-hairline bg-surface">
      <div className="flex items-center justify-between gap-2 border-b border-hairline bg-surface-2 px-3 py-2">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground">
          {title}
        </h2>
        {meta ? (
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
            {meta}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function AndroidStatusBar() {
  return (
    <div className="flex h-6 shrink-0 items-center gap-1.5 bg-surface px-3 font-mono text-[10px] text-muted-foreground">
      <span className="tabular-nums">9:41</span>
      <span className="ml-auto">LTE</span>
      <Wifi className="size-3" aria-hidden />
      <BatteryFull className="size-3.5" aria-hidden />
      <span className="tabular-nums">86%</span>
    </div>
  );
}

export function AndroidGestureBar() {
  return (
    <div className="flex h-4 shrink-0 items-center justify-center bg-surface">
      <span className="h-1 w-24 rounded-full bg-muted-foreground/50" />
    </div>
  );
}
