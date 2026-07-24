"use client";

import { useLanguage } from "@/context/LanguageContext";
import { locales } from "@/i18n/dictionaries";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.toggle")}
      className="flex items-center rounded-full border border-ink-line p-0.5 font-mono text-xs"
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            locale === l
              ? "bg-accent text-white"
              : "text-text-muted hover:text-text"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
