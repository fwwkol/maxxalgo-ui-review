import { Link } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { label: "Live", to: "/" as const },
  { label: "Strategies", to: "/strategies" as const },
  { label: "Positions", to: "/positions" as const },
  { label: "Resolution", to: "/resolution" as const },
  { label: "Mobile", to: "/mobile" as const },
  { label: "Typography", to: "/typography" as const },
  { label: "Style guide", to: "/styleguide" as const },
];


export type TopBarTab = (typeof nav)[number]["label"];

export function TopBar({ active }: { active: TopBarTab }) {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-6 px-5">
        <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
          Maxx<span className="text-profit">Algo</span>
        </span>

        <nav className="flex items-center gap-1 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`rounded px-3 py-1.5 text-[13px] transition-colors ${
                active === item.label
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <label className="ml-auto hidden h-8 w-64 md:flex items-center gap-2 rounded border border-hairline bg-surface-2 px-2.5">
          <Search className="size-3.5 text-muted-foreground" aria-hidden />
          <input
            placeholder="Search symbols"
            className="w-full bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-hairline px-1 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </label>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded border border-warn/40 bg-warn/10 px-2 py-1 font-mono text-[10px] font-medium tracking-wide text-warn">
            <span className="size-1.5 rounded-full bg-warn" />
            SANDBOX
          </span>
          <span className="hidden items-center gap-1.5 rounded border border-hairline px-2 py-1 font-mono text-[10px] text-muted-foreground lg:flex">
            <span className="size-1.5 rounded-full bg-profit" />
            3 BROKERS LIVE
          </span>
          <ThemeToggle />
          <button
            aria-label="Notifications"
            className="grid size-8 place-items-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Bell className="size-4" />
          </button>
          <span className="grid size-8 place-items-center rounded-full bg-primary font-mono text-[11px] font-medium text-primary-foreground">
            OB
          </span>
        </div>
      </div>
    </header>
  );
}
