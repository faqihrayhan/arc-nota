"use client";

import { useState, useEffect } from "react";
import { WalletButton } from "@/components/WalletButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  // Scroll spy: highlight active section
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Determine active section
      const sections = ["payment", "analisa", "forecast"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#payment", label: t("nav.payment"), id: "payment" },
    { href: "#analisa", label: t("nav.analisa"), id: "analisa" },
    { href: "#forecast", label: t("nav.forecast"), id: "forecast" },
  ];

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-line/80 bg-ink/95 backdrop-blur-xl shadow-lg shadow-black/5"
          : "border-b border-transparent bg-ink/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 group transition-all duration-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-paper-white font-display text-sm font-bold text-paper-ink shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-hover:rotate-[-2deg]">
            N
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-text transition-colors duration-300 group-hover:text-text/80">
            Nota
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 group ${
                  isActive
                    ? "text-text bg-white/[0.06]"
                    : "text-text-muted hover:text-text hover:bg-white/[0.03]"
                }`}
              >
                <span className="relative z-10">{l.label}</span>
                {/* Active indicator dot */}
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-paper-white transition-all duration-300 ${
                    isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                  }`}
                />
                {/* Hover glow */}
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.02] transition-all duration-300" />
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-1.5">
            <LanguageToggle />
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-ink-line/60 mx-1" />

          <div className="flex items-center">
            <WalletButton />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-ink-line/80 hover:border-ink-line hover:bg-white/[0.03] transition-all duration-300"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5 items-end w-5">
            <span
              className={`h-[2px] bg-text rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "w-5 rotate-45 translate-y-[5px]" : "w-5"
              }`}
            />
            <span
              className={`h-[2px] bg-text rounded-full transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-5"
              }`}
            />
            <span
              className={`h-[2px] bg-text rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "w-5 -rotate-45 -translate-y-[5px]" : "w-3"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-ink-line/60 px-5 py-5">
          <nav className="flex flex-col gap-1">
            {links.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-text bg-white/[0.06]"
                      : "text-text-muted hover:text-text hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-paper-white" : "bg-ink-line"
                    }`}
                  />
                  <span className="font-medium">{l.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-ink-line/60">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <LanguageToggle />
              </div>
              <div className="flex-1">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <WalletButton compact />
          </div>
        </div>
      </div>
    </header>
  );
}
