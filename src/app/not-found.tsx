"use client";

import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-line/40 bg-ink-2/30">
        <FileQuestion className="h-8 w-8 text-accent" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
        404 - Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Maaf, halaman yang kamu cari di Arc Nota tidak ditemukan atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/20"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </Link>
    </section>
  );
}
