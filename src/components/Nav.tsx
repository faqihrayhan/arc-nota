"use client";

import { useState } from "react";
import { WalletButton } from "@/components/WalletButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { href: "#payment", label: t("nav.payment") },
    { href: "#analisa", label: t("nav.analisa") },
    { href: "#forecast", label: t("nav.forecast") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-ink-line/80 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-paper-white font-display text-sm font-bold text-paper-ink">
            
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Nota
          </span>
        </a>

        <nav className="hidden items-center gap-8~ md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-muted transition hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          <WalletButton />
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-line md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-4 bg-text" />
            <span className="h-0.5 w-4 bg-text" />
            <span className="h-0.5 w-4 bg-text" />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-line px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-text-muted transition hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="mt-3">
            <WalletButton compact />
          </div>
        </div>
      )}
    </header>
  );
}
