"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { CreditCard, BarChart3, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  payment: CreditCard,
  analisa: BarChart3,
  forecast: TrendingUp,
};

export function FeatureSection() {
  const { t } = useLanguage();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );
    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      id: "payment",
      ply: "bg-paper-white",
      title: t("features.payment.title"),
      description: t("features.payment.desc"),
      iconColor: "text-paper-ink",
      bgGlow: "bg-paper-white/5",
      href: "/payment",
    },
    {
      id: "analisa",
      ply: "bg-paper-pink",
      title: t("features.analisa.title"),
      description: t("features.analisa.desc"),
      iconColor: "text-pink-400",
      bgGlow: "bg-paper-pink/5",
      href: "/analisa",
    },
    {
      id: "forecast",
      ply: "bg-paper-yellow",
      title: t("features.forecast.title"),
      description: t("features.forecast.desc"),
      iconColor: "text-amber-400",
      bgGlow: "bg-paper-yellow/5",
      href: "/forecast",
    },
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="relative border-t border-ink-line/40 bg-ink-2/20 scroll-mt-28">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--ink-line) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-line/40 bg-ink-2/50 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-text-muted">
            <Sparkles className="h-3 w-3" />
            {t("features.eyebrow")}
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]">{t("features.title")}</h2>
          <p className="mt-4 text-text-muted leading-relaxed">{t("features.desc")}</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.id];
            const isVisible = visibleCards.has(i);
            return (
              <a
                key={f.id}
                href={f.href}
                data-index={i}
                className={cn("group relative scroll-mt-28 overflow-hidden rounded-2xl border border-ink-line/40 bg-ink transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink-line/70 hover:shadow-lg hover:shadow-black/10", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`h-1 w-full ${f.ply}`} />
                <div className={cn("absolute -right-20 -top-20 h-40 w-40 rounded-full blur-[60px] transition-opacity duration-500 opacity-0 group-hover:opacity-100", f.bgGlow)} />
                <div className="relative p-7">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-ink-line/40 bg-ink-2/60 px-2.5 py-0.5 text-[10px] font-medium text-text-faint">{t("features.tryNow")}</span>
                  </div>
                  <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-2 border border-ink-line/30 transition-all duration-300 group-hover:scale-110 group-hover:border-ink-line/50">
                    <Icon className={cn("h-5 w-5", f.iconColor)} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{f.description}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm text-text-faint transition-all duration-300 group-hover:text-accent">
                    <span className="font-medium">{t("features.open")}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}