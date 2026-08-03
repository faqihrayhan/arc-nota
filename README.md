# Nota

<p align="center">
  <img src="https://img.shields.io/badge/Built%20on-Arc%20Testnet-4E7FE0?style=flat-square" alt="Built on Arc Testnet" />
  <img src="https://img.shields.io/badge/Next.js-16.2.10-000000?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
</p>


## About

Nota

**Payment tracking and financial insight, on-chain on Arc.**

Pay with a QR code, get it logged as a digital receipt automatically,
analyzed, and projected forward. Built on [Arc](https://arc.io) a stablecoin payments network.

**Product Analogy:** Most crypto payment apps stop at "transaction sent." Nota goes one step
further every payment becomes a note (a "nota," Indonesian for
receipt), which then feeds into spending analysis and a forecast for
next month. Think of it like a triplicate receipt book, except one copy
lives on-chain.

---

## Features

| Feature | What it does | Status |
|---|---|---|
| **Payment** | Show a payment QR, get scanned, logged on-chain automatically | Success |
| **Insights** | Auto-categorized breakdown of where your money went | Success |
| **Forecast** | Projected spending for next month based on history | Success |

Landing page, wallet connection, dark/light mode, and ID/EN language
support are already live.

---

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4**  
- **next-themes**  dark/light mode
- **Wallet**  EIP-1193 custom (MetaMask & OKX)
- **i18n** custom dictionary (ID/EN)
- **Database** Supabase (with localStorage fallback)

---

## Arc Testnet

| Parameter | Nilai |
|-----------|-------|
| RPC URL | `https://rpc.testnet.arc.network` |
| Chain ID | `5042002` (hex: `0x4cef52`) |
| Explorer | [testnet.arcscan.app](https://testnet.arcscan.app) |
| Faucet | [faucet.circle.com](https://faucet.circle.com) |
| Gas Token | USDC (native: 18 decimal, ERC-20: 6 decimal) |

---

## Running Locally

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

## Project Structure

```
src/
├── app/          # Routing & layout (Next.js App Router)
├── components/   # UI components
├── context/      # React Context (wallet, language)
├── lib/          # Config & helpers (chain config, etc.)
└── i18n/         # ID/EN translation strings
```

---

## Heads up

This runs on **Arc Testnet** tokens and transactions here have **no
real value**. Purely for building and testing.

## Built on Arc

This project is built on [Arc](https://arc.io) infrastructure. See the
[Arc Brand Guidelines](https://www.arc.io/brand-guidelines-and-partner-toolkit)
for logo/name usage.

## License

MIT License. See [LICENSE](./LICENSE) for details.

Built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org), [Tailwind CSS](https://tailwindcss.com), and [Arc Testnet](https://www.arc.io).
