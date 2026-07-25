"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useLanguage } from "@/context/LanguageContext";
import { getTransactions, type Transaction } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Receipt,
  Calendar,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Loader2,
} from "lucide-react";

type Period = "week" | "month" | "all";

const CATEGORY_COLORS: Record<string, string> = {
  makan: "bg-paper-pink",
  transport: "bg-accent",
  belanja: "bg-paper-yellow",
  hiburan: "bg-warn-amber",
  kesehatan: "bg-stamp-green",
  lainnya: "bg-text-muted",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatUSDC(amount: number): string {
  return amount.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getPeriodStart(period: Period): Date {
  const now = new Date();
  if (period === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d;
  }
  if (period === "month") {
    const d = new Date(now);
    d.setMonth(d.getMonth() - 1);
    return d;
  }
  return new Date(0);
}

export default function AnalisaPage() {
  const wallet = useWallet();
  const { t } = useLanguage();
  const [period, setPeriod] = useState<Period>("month");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet.address) return;
    setLoading(true);
    getTransactions(wallet.address)
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [wallet.address]);

  const periodStart = getPeriodStart(period);
  const filtered = transactions.filter((t) => new Date(t.created_at) >= periodStart);

  const byCategory = filtered.reduce((acc, tx) => {
    const cat = tx.category || "lainnya";
    acc[cat] = (acc[cat] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalSpent = Object.values(byCategory).reduce((a, b) => a + b, 0);
  const maxCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];

  const byDay = filtered.reduce((acc, tx) => {
    const day = new Date(tx.created_at).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedDays = Object.entries(byDay).sort(([a], [b]) => a.localeCompare(b));
  const maxDayValue = Math.max(...Object.values(byDay), 1);

  if (!wallet.address) {
    return (
      <section className="relative mx-auto max-w-4xl px-5 py-24">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-line/40 bg-ink-2/30 p-12 text-center">
          <Wallet className="h-12 w-12 text-text-muted" />
          <h2 className="mt-4 font-display text-xl font-semibold">{t("analisa.connectFirst")}</h2>
          <p className="mt-2 text-sm text-text-muted">{t("analisa.connectDesc")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-4xl px-5 py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink-line/40 bg-ink-2/50 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-text-muted">
          <BarChart3 className="h-3 w-3" />
          {t("analisa.eyebrow")}
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">{t("analisa.title")}</h1>
        <p className="mt-2 text-text-muted">{t("analisa.desc")}</p>
      </div>

      <div className="flex gap-2">
        {(["week", "month", "all"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
              period === p
                ? "bg-accent text-white"
                : "border border-ink-line/40 text-text-muted hover:text-text hover:bg-ink-2"
            )}
          >
            {t(`analisa.period.${p}`)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-12 flex items-center justify-center gap-2 text-text-muted">
          <Loader2 className="h-5 w-5 animate-spin" />
          {t("analisa.loading")}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-ink-line/40 bg-ink-2/20 p-12 text-center">
          <Receipt className="mx-auto h-12 w-12 text-text-faint" />
          <h3 className="mt-4 font-display text-lg font-semibold">{t("analisa.emptyTitle")}</h3>
          <p className="mt-2 text-sm text-text-muted">{t("analisa.emptyDesc")}</p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink-line/40 bg-ink p-6">
              <div className="flex items-center gap-2 text-text-muted">
                <Receipt className="h-4 w-4" />
                <span className="text-xs font-mono uppercase">{t("analisa.totalSpent")}</span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold">{formatUSDC(totalSpent)} USDC</p>
            </div>
            <div className="rounded-2xl border border-ink-line/40 bg-ink p-6">
              <div className="flex items-center gap-2 text-text-muted">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-mono uppercase">{t("analisa.transactions")}</span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold">{filtered.length}</p>
            </div>
            <div className="rounded-2xl border border-ink-line/40 bg-ink p-6">
              <div className="flex items-center gap-2 text-text-muted">
                <Tag className="h-4 w-4" />
                <span className="text-xs font-mono uppercase">{t("analisa.topCategory")}</span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold capitalize">
                {maxCategory ? t(`payment.cat.${maxCategory[0]}`) : "—"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-line/40 bg-ink p-6">
            <h3 className="font-display text-sm font-semibold">{t("analisa.byCategory")}</h3>
            <div className="mt-4 space-y-3">
              {Object.entries(byCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, amount]) => {
                  const pct = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 capitalize">
                          <span className={cn("h-2.5 w-2.5 rounded-full", CATEGORY_COLORS[cat] || "bg-text-muted")} />
                          {t(`payment.cat.${cat}`)}
                        </span>
                        <span className="font-mono">{formatUSDC(amount)} USDC ({pct.toFixed(1)}%)</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-ink-2 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-500", CATEGORY_COLORS[cat] || "bg-text-muted")}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {sortedDays.length > 1 && (
            <div className="rounded-2xl border border-ink-line/40 bg-ink p-6">
              <h3 className="font-display text-sm font-semibold">{t("analisa.dailyTrend")}</h3>
              <div className="mt-4 flex items-end gap-1 h-32">
                {sortedDays.map(([day, amount]) => {
                  const height = Math.max(4, (amount / maxDayValue) * 100);
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-accent/60 hover:bg-accent transition-colors"
                        style={{ height: `${height}%` }}
                        title={`${day}: ${formatUSDC(amount)} USDC`}
                      />
                      <span className="text-[9px] text-text-faint font-mono">
                        {day.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-ink-line/40 bg-ink p-6">
            <h3 className="font-display text-sm font-semibold">{t("analisa.recentTx")}</h3>
            <div className="mt-4 space-y-2">
              {filtered.slice(0, 10).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-xl border border-ink-line/30 bg-ink-2/30 px-4 py-3 transition-colors hover:bg-ink-2/60"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", CATEGORY_COLORS[tx.category] || "bg-text-muted", "bg-opacity-20")}>
                      <Receipt className="h-4 w-4 text-text" />
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">{t(`payment.cat.${tx.category}`)}</p>
                      <p className="text-xs text-text-faint font-mono">{formatDate(tx.created_at)}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-medium">
                    {tx.mode === "receive" ? "+" : "-"}{formatUSDC(tx.amount)} USDC
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}