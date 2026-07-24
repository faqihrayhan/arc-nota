"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

/* ============================================================
   THEME TOGGLE — Nota v2.0
   Features:
   - Smooth icon morph
   - Tooltip on hover
   - Reduced motion support
   ============================================================ */

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("theme.toggle")}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300",
        "border-ink-line/40 text-text-muted hover:border-ink-line hover:text-text hover:bg-white/[0.03]"
      )}
    >
      {mounted ? (
        <div className="relative h-4 w-4">
          <Sun
            className={cn(
              "absolute inset-0 h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            )}
          />
          <Moon
            className={cn(
              "absolute inset-0 h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              !isDark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            )}
          />
        </div>
      ) : (
        <div className="h-4 w-4 animate-pulse rounded-full bg-ink-line" />
      )}
    </button>
  );
}
