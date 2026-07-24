"use client";

import { WalletButton } from "@/components/WalletButton";
import { useLanguage } from "@/context/LanguageContext";

// Deterministic pattern so the placeholder QR looks the same on every
// render (no hydration mismatch) without needing a real QR library yet.
const QR_PATTERN = [
  1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0,
  1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1,
  1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1,
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-2 px-3 py-1 text-xs text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-stamp-green" />
            {t("hero.badge")}
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {t("hero.title1")}
            <br />
            <span className="text-accent">{t("hero.title2")}</span>
          </h1>

          <p className="mt-5 max-w-md text-base text-text-muted">
            {t("hero.desc")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WalletButton />
            <a
              href="#payment"
              className="rounded-full border border-ink-line px-5 py-2 text-sm text-text transition hover:border-text-muted"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <p className="mt-4 font-mono text-xs text-text-muted">
            {t("hero.chainNote")}
          </p>
        </div>

        {/* Signature element: a tilted receipt, like the first ply of a
            carbon-copy nota book. */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-accent/10 blur-2xl" />

          <div className="rotate-[3deg] rounded-sm bg-paper-yellow/70 p-2 shadow-xl shadow-black/30">
            <div className="-rotate-[6deg] translate-x-2 rounded-sm bg-paper-pink/80 p-2 shadow-xl shadow-black/20">
              <div className="rotate-[2deg] rounded-sm bg-paper-white p-6 text-paper-ink shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between border-b border-dashed border-paper-ink/30 pb-3">
                  <div>
                    <p className="font-display text-sm font-semibold">
                      NOTA
                    </p>
                    <p className="font-mono text-[11px] text-paper-ink/60">
                      #ARC-04521
                    </p>
                  </div>
                  <div className="grid grid-cols-8 gap-[2px]">
                    {QR_PATTERN.map((filled, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 ${
                          filled ? "bg-paper-ink" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-paper-ink/60">
                      {t("hero.receipt.item1")}
                    </span>
                    <span>32.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-paper-ink/60">
                      {t("hero.receipt.item2")}
                    </span>
                    <span>3.000</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-paper-ink/30 pt-2 font-semibold">
                    <span>{t("hero.receipt.total")}</span>
                    <span>35.000 USDC</span>
                  </div>
                </div>

                <div className="relative mt-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-paper-ink/50">
                    {t("hero.receipt.block")}
                  </span>
                  <span className="rotate-[-8deg] rounded-sm border-2 border-stamp-green px-2 py-0.5 font-display text-[11px] font-bold text-stamp-green">
                    {t("hero.receipt.stamp")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
