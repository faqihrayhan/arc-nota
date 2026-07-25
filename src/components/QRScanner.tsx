"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { X, Camera, ScanLine } from "lucide-react";

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const { t } = useLanguage();
  const readerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const scannerInstanceRef = useRef<any>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function start() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (!mounted || !readerRef.current) return;

        const scanner = new Html5Qrcode("qr-reader");
        scannerInstanceRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText: string) => {
            onScan(decodedText);
            isRunningRef.current = false;
            scanner.stop().catch(() => {});
          },
          () => {}
        );

        if (mounted) {
          setScanning(true);
          isRunningRef.current = true;
        }
      } catch (err) {
        if (mounted) {
          setError(t("payment.cameraError"));
          setScanning(false);
          isRunningRef.current = false;
        }
      }
    }

    start();

    return () => {
      mounted = false;
      if (isRunningRef.current && scannerInstanceRef.current) {
        scannerInstanceRef.current.stop().catch(() => {});
        isRunningRef.current = false;
      }
    };
  }, [onScan, t]);

  const handleClose = () => {
    // Only try to stop if scanner is actually running
    if (isRunningRef.current && scannerInstanceRef.current) {
      scannerInstanceRef.current
        .stop()
        .catch(() => {})
        .finally(() => {
          isRunningRef.current = false;
          onClose();
        });
    } else {
      // Scanner never started or already errored — just close
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-ink-line/60 bg-ink-2 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-line/40 px-5 py-4">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-accent" />
            <span className="font-display text-sm font-semibold">{t("payment.scanWithCamera")}</span>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-line/40 text-text-muted transition-all hover:text-text hover:bg-white/[0.03]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Camera view */}
        <div className="relative p-4">
          {error ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-warn-amber/30 bg-warn-amber/10 p-8 text-center">
              <ScanLine className="h-10 w-10 text-warn-amber/60" />
              <p className="mt-3 text-sm text-warn-amber">{error}</p>
              <p className="mt-1 text-xs text-text-muted">{t("payment.cameraFallback")}</p>
            </div>
          ) : (
            <>
              <div
                id="qr-reader"
                ref={readerRef}
                className="overflow-hidden rounded-xl border border-ink-line/40"
                style={{ minHeight: 250 }}
              />
              {!scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <ScanLine className="h-4 w-4 animate-pulse" />
                    {t("payment.cameraLoading")}
                  </div>
                </div>
              )}
              {/* Corner brackets overlay */}
              <div className="pointer-events-none absolute inset-4">
                <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent/60" />
                <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent/60" />
                <div className="absolute left-0 bottom-0 h-6 w-6 border-l-2 border-b-2 border-accent/60" />
                <div className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-accent/60" />
              </div>
            </>
          )}
        </div>

        <div className="border-t border-ink-line/40 px-5 py-3 text-center">
          <p className="text-[11px] text-text-faint">{t("payment.cameraHint")}</p>
        </div>
      </div>
    </div>
  );
}