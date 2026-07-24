@AGENTS.md

# Project: Nota — Arc Testnet

## Ringkasan
Nota adalah web app pencatatan & analisa pengeluaran berbasis Arc Testnet.
Tiap transaksi jadi "nota" on-chain (QR untuk dibayar/discan kasir), yang
kemudian dianalisa dan dipakai buat proyeksi pengeluaran bulan depan. Fase
sekarang: landing page + wallet connect. Fitur inti (Payment/Analisa
Keuangan/Forecast) belum dibangun, masih placeholder "Segera hadir".

## Tech Stack
- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 — semua warna lewat CSS variable di `src/app/globals.css`,
  jangan pakai hex/warna custom langsung di className
- next-themes — dark/light mode
- Wallet: EIP-1193 custom (window.ethereum / window.okxwallet langsung),
  BUKAN wagmi/viem — lihat `src/context/WalletContext.tsx`
- i18n custom (ID/EN) — lihat `src/i18n/dictionaries.ts`, BUKAN next-intl
- Package manager: npm

### Catatan soal versi Next.js ini
Next.js 16 (Turbopack) punya breaking changes dari training data AI manapun.
Sebelum nulis kode yang menyentuh routing/config Next.js, cek dulu
`node_modules/next/dist/docs/` (referensi lengkap ada di `AGENTS.md` di
root project — jangan dihapus, itu auto-generated dan berguna).

## Info Jaringan Arc Testnet
- RPC URL: https://rpc.testnet.arc.network
- Chain ID: 5042002 (hex: `0x4cef52`)
- Explorer: https://testnet.arcscan.app
- Faucet: https://faucet.circle.com
- **Desimal — sering ketuker, baca pelan-pelan:**
  - Native gas currency yang ditampilkan wallet (hasil `eth_getBalance`,
    config `wallet_addEthereumChain`) = **18 desimal**, sama kayak ETH di
    chain EVM lain. Ini yang dipakai buat nampilin saldo gas di wallet.
  - Kontrak ERC-20 USDC standar (kalau nanti project ini transfer/baca
    saldo token USDC lewat smart contract call) = **6 desimal**, sama
    kayak USDC di semua chain lain.
  - Jangan asumsiin salah satu desimal ini berlaku buat keduanya.
- **Source of truth config chain ada di `src/lib/arc-chain.ts`** — semua
  komponen lain import dari situ. Jangan hardcode chain ID/RPC/desimal di
  file lain.

## Arc Brand Guidelines (Partner Toolkit)
Berlaku kalau ada penyebutan nama/logo "Arc" di README, UI, landing page,
dokumentasi publik, atau materi marketing project ini.
- Prinsip utama: brand project INI ("Nota") yang jadi headline/identitas
  utama. Arc diposisikan sebagai infrastruktur di baliknya, bukan
  sebaliknya.
- Frasa yang disetujui untuk dipakai (gunakan persis seperti ini):
  "Built on Arc", "Available on Arc", "Supports Arc", "Live on Arc"
  (badge "Built on Arc" di hero section sudah sesuai konvensi ini — pertahankan format ini kalau ada penambahan badge serupa)
- JANGAN:
  - Menampilkan app ini seolah bernama/berbrand "Arc"
  - Memodifikasi logo Arc dengan cara apa pun
  - Memakai logo Arc sebagai logo app ini
- Referensi lengkap (logo, contoh visual, aturan lengkap):
  https://www.arc.io/brand-guidelines-and-partner-toolkit
- Pertanyaan seputar approval/trademark: trademarks@circle.com

## Gaya Komunikasi (Mode Belajar)
Raymoon masih belajar web development (paham konsep umum coding/Python,
tapi baru di web/Next.js). Setiap kali mengerjakan request dan
menghasilkan output (kode baru, file diubah, command dijalankan):
- Kerjain dulu tugasnya sampai selesai — jangan nunda kerjaan cuma buat
  jelasin dulu di depan.
- **Setelah** output selesai, kasih penjelasan singkat: apa yang berubah,
  kenapa dibikin dengan cara itu (bukan cara lain), dan istilah teknis
  yang baru muncul (definisikan 1 kalimat, bahasa awam).
- Gak perlu jelasin ulang konsep yang udah pernah dijelasin sebelumnya di
  sesi yang sama — cukup singgung singkat kalau relevan.
- Kalau perubahannya kecil/rutin (misal ganti satu teks, fix typo),
  penjelasannya boleh 1-2 kalimat aja, gak usah dipanjangin.
- Kalau ada keputusan desain/arsitektur yang cukup penting (bukan
  detail kecil), jelasin trade-off-nya secara singkat — bukan cuma bilang
  "aku pakai X", tapi kenapa X dibanding alternatif lain.

## Struktur Folder
- `src/app/` — routing App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/` — Nav, Hero, FeatureSection, Footer, WalletButton,
  ThemeToggle, LanguageToggle
- `src/context/` — WalletContext, LanguageContext (React Context, "use client")
- `src/lib/` — arc-chain.ts (config chain), wallet-types.d.ts (typing window.ethereum)
- `src/i18n/` — dictionaries.ts (semua teks ID/EN)

## Konvensi Kode
- Komponen: PascalCase, satu komponen per file
- **Semua teks yang tampil ke user WAJIB lewat `useLanguage().t('key')`** —
  jangan hardcode string ID/EN langsung di JSX. Tambah key baru di
  `src/i18n/dictionaries.ts`, isi `id` DAN `en` sekaligus dalam satu edit,
  jangan biarin salah satu bahasa nyisa key kosong
- Warna pakai token Tailwind yang udah didefinisikan (`bg-ink`,
  `text-text-muted`, `bg-paper-pink`, dst) — supaya dark/light mode tetap
  konsisten otomatis
- Komponen yang pakai state/browser API (localStorage, window.ethereum,
  hooks) wajib `"use client"` di baris paling atas
- Konsep visual "nota 3 rangkap" (putih/pink/kuning) itu identitas utama
  produk ini — jangan diubah ke tema generic tanpa didiskusikan dulu

## Command yang Sering Dipakai
```
npm run dev        # dev server, localhost:3000
npm run build       # production build
npm run lint         # eslint
npx tsc --noEmit      # type-check tanpa build
```

## Git Workflow
- Jangan pernah menjalankan `git commit` atau `git push`. Setelah selesai
  mengerjakan sesuatu, cukup kasih tau saya perubahan apa yang dibuat dan
  biarkan saya yang commit & push secara manual.
- `git add`, `git diff`, `git status`, `git log` boleh dijalankan untuk cek
  perubahan.
- Jangan pernah menambahkan baris "Co-Authored-By" atau atribusi AI apa pun
  ke commit message atau PR description.

## ATURAN KEAMANAN (WAJIB DIPATUHI)
- Project ini TIDAK menyimpan/menangani private key user — koneksi wallet
  selalu lewat provider yang di-inject browser (MetaMask/OKX). Private key
  user tidak pernah, dan tidak boleh, menyentuh kode aplikasi ini. Jangan
  pernah menambahkan logic yang meminta atau menyimpan private key/seed
  phrase user dengan cara apa pun.
- Kalau nanti ada fitur yang butuh API key/secret (misalnya API eksternal
  buat fitur Forecast), taro di `.env`, dan pastikan `.env` ada di
  `.gitignore` sebelum commit pertama yang pakai secret itu.
- Wallet yang dipakai buat testing HANYA wallet testnet — jangan pernah
  connect pakai wallet yang isinya dana mainnet asli.
- Sebelum menambahkan dependency baru yang besar/tidak familiar (terutama
  library terkait wallet/signing), kasih tau dulu alasannya sebelum install.

## Status Project Saat Ini
- [x] Landing page (hero, 3 fitur preview, footer)
- [x] Connect wallet (MetaMask & OKX Wallet, auto-detect & switch ke Arc Testnet)
- [x] Dark/light mode toggle
- [x] Bahasa ID/EN toggle
- [ ] Fitur Payment (QRIS scan-to-pay, catat transaksi on-chain)
- [ ] Fitur Analisa Keuangan
- [ ] Fitur Forecast
- [ ] WalletConnect/Reown buat scan QR dari wallet HP eksternal (sekarang baru injected provider + deep link)
