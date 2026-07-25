# Nota — Catatan Pembayaran & Analisa Keuangan di Arc

<p align="center">
  <img src="https://img.shields.io/badge/Built%20on-Arc%20Testnet-4E7FE0?style=flat-square" alt="Built on Arc Testnet" />
  <img src="https://img.shields.io/badge/Next.js-16.2.10-000000?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
</p>

<p align="center">
  <strong>Tiap transaksi jadi nota. Tiap nota jadi wawasan.</strong>
</p>

---

## Tentang

**Nota** adalah aplikasi web pencatatan & analisa pengeluaran pribadi yang berjalan di atas **Arc Testnet**. Pengguna membayar transaksi sehari-hari lewat QR code, dan setiap transaksi otomatis tercatat sebagai "nota" digital on-chain. Dari kumpulan nota itu, aplikasi menyediakan analisa pengeluaran dan proyeksi (forecast) untuk bulan berikutnya.

**Analogi produk:** nota rangkap tiga ala toko Indonesia (putih/pink/kuning) — satu transaksi, tiga kegunaan: bukti bayar, bahan analisa, bahan proyeksi.

---

## Fitur

| Fitur | Deskripsi | Status |
|-------|-----------|--------|
| **Payment** | Generate QR untuk menerima pembayaran, atau scan QR untuk membayar. Model pull/allowance — pembayar approve, kasir transferFrom. | ✅ Live |
| **Analisa Keuangan** | Semua nota dikelompokkan otomatis per kategori dengan breakdown visual. | ✅ Live |
| **Forecast** | Proyeksi pengeluaran bulan depan berdasarkan pola historis. | ✅ Live |
| **Multi-wallet** | Dukungan MetaMask & OKX Wallet dengan auto-switch ke Arc Testnet. | ✅ Live |
| **i18n** | Bahasa Indonesia & English. | ✅ Live |
| **Dark/Light Mode** | Tema gelap & terang dengan design system "ledger paper". | ✅ Live |

---

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — semua warna lewat CSS variable
- **next-themes** — dark/light mode
- **Wallet** — EIP-1193 custom (MetaMask & OKX), bukan wagmi/viem
- **i18n** — custom dictionary (ID/EN), bukan next-intl
- **Database** — Supabase (dengan localStorage fallback)

---

## Info Jaringan Arc Testnet

| Parameter | Nilai |
|-----------|-------|
| RPC URL | `https://rpc.testnet.arc.network` |
| Chain ID | `5042002` (hex: `0x4cef52`) |
| Explorer | [testnet.arcscan.app](https://testnet.arcscan.app) |
| Faucet | [faucet.circle.com](https://faucet.circle.com) |
| Gas Token | USDC (native: 18 decimal, ERC-20: 6 decimal) |

---

## Cara Menjalankan

```bash
# Clone & install
git clone https://github.com/faqihrayhan/arc-nota.git
cd arc-nota
npm install

# Jalankan dev server
npm run dev
# Buka http://localhost:3000
```

---

## Struktur Folder

```
src/
├── app/              # Routing App Router
├── components/       # React components
├── context/          # WalletContext, LanguageContext
├── lib/              # Config chain, utilities
└── i18n/             # Dictionaries (ID/EN)
```

---

## License

MIT License. See [LICENSE](./LICENSE) for details.

Built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org), [Tailwind CSS](https://tailwindcss.com), and [Arc Testnet](https://www.arc.io).
