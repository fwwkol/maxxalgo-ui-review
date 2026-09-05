import { useState } from "react";
import { Eye, EyeOff, Fingerprint, Lock, Server, User } from "lucide-react";

export function MobileLogin({ onSignIn }: { onSignIn: () => void }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("obull");
  const [pass, setPass] = useState("");

  return (
    <div className="flex min-h-full flex-col px-5 pb-6 pt-10">
      <div>
        <span className="font-mono text-[26px] font-semibold tracking-tight text-foreground">
          Maxx<span className="text-profit">Algo</span>
        </span>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Openbull terminal · Android
        </p>
      </div>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSignIn();
        }}
      >
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            Username
          </span>
          <span className="mt-1 flex h-12 items-center gap-2 rounded border border-hairline bg-surface px-3 focus-within:border-profit">
            <User className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              className="min-w-0 flex-1 bg-transparent font-mono text-[14px] text-foreground outline-none"
            />
          </span>
        </label>

        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            Password
          </span>
          <span className="mt-1 flex h-12 items-center gap-2 rounded border border-hairline bg-surface px-3 focus-within:border-profit">
            <Lock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="min-w-0 flex-1 bg-transparent font-mono text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="grid size-9 shrink-0 place-items-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </span>
        </label>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <input type="checkbox" defaultChecked className="size-4 accent-[var(--accent-orange)]" />
            Keep me signed in
          </label>
          <button
            type="button"
            className="font-mono text-[11px] text-profit underline-offset-2 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded bg-primary font-mono text-[12px] font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={onSignIn}
          className="flex h-12 w-full items-center justify-center gap-2 rounded border border-hairline font-mono text-[12px] uppercase tracking-wide text-foreground hover:bg-secondary"
        >
          <Fingerprint className="size-4 text-profit" /> Use fingerprint
        </button>
      </form>

      <div className="mt-auto pt-8">
        <span className="flex items-center gap-2 rounded border border-hairline bg-surface-2 px-3 py-2 font-mono text-[10px] text-muted-foreground">
          <Server className="size-3.5 shrink-0" aria-hidden />
          <span className="min-w-0 flex-1 truncate">Server: openbull-dev.shares.zrok.io</span>
          <span className="shrink-0 text-profit">Change</span>
        </span>
        <p className="mt-3 font-mono text-[9px] leading-relaxed text-muted-foreground">
          Self-hosted build · sessions expire after 12 hours of inactivity.
        </p>
      </div>
    </div>
  );
}
