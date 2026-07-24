"use client";

import { useLanguage } from "@/context/LanguageContext";
import { locales } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

/* ============================================================
   LANGUAGE TOGGLE — Nota v2.0
   Features:
   - Pill-style segmented control
   - Smooth active indicator
   - Accessible
   ============================================================ */

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.toggle")}
      className="flex items-center gap-0.5"
    >
      {locales.map((l) => {
        const isActive = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            aria-pressed={isActive}
            className={cn(
              "relative rounded-lg px-3 py-1.5 text-xs font-mono font-medium uppercase transition-all duration-300",
              isActive
                ? "text-white"
                : "text-text-muted hover:text-text"
            )}
          >
            {/* Active background pill */}
            {isActive && (
              <span className="absolute inset-0 rounded-lg bg-accent shadow-sm shadow-accent/20 transition-all duration-300" />
            )}
            <span className="relative z-10">{l}</span>
          </button>
        );
      })}
    </div>
  );
}
