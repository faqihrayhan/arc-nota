"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-ink-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Nota. {t("footer.builtOn")}
        </p>
        <p>{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
