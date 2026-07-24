"use client";

import { useLanguage } from "@/context/LanguageContext";

export function FeatureSection() {
  const { t } = useLanguage();

  const features = [
    {
      id: "payment",
      ply: "bg-paper-white",
      plyLabel: t("features.payment.ply"),
      title: t("features.payment.title"),
      description: t("features.payment.desc"),
    },
    {
      id: "analisa",
      ply: "bg-paper-pink",
      plyLabel: t("features.analisa.ply"),
      title: t("features.analisa.title"),
      description: t("features.analisa.desc"),
    },
    {
      id: "forecast",
      ply: "bg-paper-yellow",
      plyLabel: t("features.forecast.ply"),
      title: t("features.forecast.title"),
      description: t("features.forecast.desc"),
    },
  ];

  return (
    <section className="border-t border-ink-line bg-ink-2/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
            {t("features.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-text-muted">{t("features.desc")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.id}
              id={f.id}
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-ink-line bg-ink"
            >
              <div className={`h-1.5 w-full ${f.ply}`} />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-text-muted">
                    {f.plyLabel}
                  </span>
                  <span className="rounded-full bg-ink-line px-2.5 py-0.5 text-[11px] text-text-muted">
                    {t("features.comingSoon")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
