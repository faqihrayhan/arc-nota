"use client";

import { useEffect, useRef, useState } from "react";
import { useWallet, type WalletId } from "@/context/WalletContext";
import { useLanguage } from "@/context/LanguageContext";
import { ARC_EXPLORER_URL } from "@/lib/arc-chain";

const WALLETS: { id: WalletId; label: string; monogram: string }[] = [
  { id: "metamask", label: "MetaMask", monogram: "MM" },
  { id: "okx", label: "OKX Wallet", monogram: "OKX" },
];

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const wallet = useWallet();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handlePick = async (id: WalletId) => {
    await wallet.connect(id);
    setOpen(false);
  };

  // --- Connected state ---
  if (wallet.status === "connected" && wallet.address) {
    if (!wallet.isCorrectNetwork) {
      return (
        <button
          onClick={() => wallet.switchToArc()}
          className="flex items-center gap-2 rounded-full border border-warn-amber/60 bg-warn-amber/10 px-4 py-2 text-sm font-medium text-warn-amber transition hover:bg-warn-amber/20"
        >
          <span className="h-2 w-2 rounded-full bg-warn-amber" />
          {t("wallet.switchNetwork")}
        </button>
      );
    }

    return (
      <div className="relative" ref={rootRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-ink-line bg-ink-2 px-4 py-2 font-mono text-sm text-text transition hover:border-stamp-green/60"
        >
          <span className="h-2 w-2 rounded-full bg-stamp-green" />
          {shortAddress(wallet.address)}
        </button>
        {open && (
          <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-ink-line bg-ink-2 shadow-xl shadow-black/40">
            <div className="border-b border-ink-line px-4 py-3">
              <p className="text-xs text-text-muted">
                {t("wallet.connectedVia")}
              </p>
              <p className="text-sm font-medium capitalize">
                {wallet.walletId === "okx" ? "OKX Wallet" : "MetaMask"}
              </p>
            </div>
            <a
              href={`${ARC_EXPLORER_URL}/address/${wallet.address}`}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-2.5 text-sm text-text hover:bg-ink"
            >
              {t("wallet.viewExplorer")}
            </a>
            <button
              onClick={() => {
                wallet.disconnect();
                setOpen(false);
              }}
              className="block w-full px-4 py-2.5 text-left text-sm text-warn-amber hover:bg-ink"
            >
              {t("wallet.disconnect")}
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- Idle / connecting / error state ---
  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={wallet.status === "connecting"}
        className={`rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-accent-strong disabled:opacity-60 ${
          compact ? "w-full" : ""
        }`}
      >
        {wallet.status === "connecting"
          ? t("wallet.connecting")
          : t("wallet.connect")}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border border-ink-line bg-ink-2 shadow-xl shadow-black/40">
          <p className="border-b border-ink-line px-4 py-2.5 text-xs text-text-muted">
            {t("wallet.pick")}
          </p>
          {WALLETS.map((w) => {
            const available = wallet.isProviderAvailable(w.id);
            if (!available && wallet.isMobile) {
              return (
                <a
                  key={w.id}
                  href={wallet.mobileDeepLink(w.id)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-ink"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-line font-mono text-[10px]">
                    {w.monogram}
                  </span>
                  {t("wallet.openInApp")} {w.label}
                </a>
              );
            }
            if (!available) {
              return (
                <div
                  key={w.id}
                  className="flex items-center justify-between px-4 py-3 text-sm text-text-muted"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-line font-mono text-[10px]">
                      {w.monogram}
                    </span>
                    {w.label}
                  </span>
                  <span className="text-xs">{t("wallet.notDetected")}</span>
                </div>
              );
            }
            return (
              <button
                key={w.id}
                onClick={() => handlePick(w.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-text hover:bg-ink"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-line font-mono text-[10px]">
                  {w.monogram}
                </span>
                {w.label}
              </button>
            );
          })}
          {wallet.status === "error" && wallet.error === "not_found" && (
            <p className="border-t border-ink-line px-4 py-2.5 text-xs text-warn-amber">
              {t("wallet.notInstalled")}
            </p>
          )}
          {wallet.status === "error" && wallet.error === "rejected" && (
            <p className="border-t border-ink-line px-4 py-2.5 text-xs text-warn-amber">
              {t("wallet.rejected")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
