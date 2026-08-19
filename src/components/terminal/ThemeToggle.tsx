import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "maxx-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(KEY, dark ? "dark" : "light");
  }, [dark, ready]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? "Switch to light terminal" : "Switch to dark terminal"}
      title={dark ? "Light terminal" : "Dark terminal"}
      className="grid size-8 shrink-0 place-items-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
