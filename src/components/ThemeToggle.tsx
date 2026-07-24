"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  // Theme is only known after mount (it depends on localStorage/system
  // preference), so render a neutral placeholder first to avoid a
  // server/client mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={t("theme.toggle")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-text transition hover:border-text-muted"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
