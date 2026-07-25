# Nota

**Payment tracking and financial insight, on-chain on Arc.**

Pay with a QR code, get it logged as a digital receipt automatically,
analyzed, and projected forward. Built on [Arc](https://arc.io) —
a stablecoin payments network.

🔗 **Live demo:** [arc-notes-delta.vercel.app](https://arc-notes-delta.vercel.app)

---

## What is this

Most crypto payment apps stop at "transaction sent." Nota goes one step
further — every payment becomes a note (a "nota," Indonesian for
receipt), which then feeds into spending analysis and a forecast for
next month. Think of it like a triplicate receipt book, except one copy
lives on-chain.

Still early — this started as a way to actually learn how a wallet-
connected dApp gets built end to end, not just ship a demo.

## Features

| Feature | What it does | Status |
|---|---|---|
| **Payment** | Show a payment QR, get scanned, logged on-chain automatically | Success |
| **Insights** | Auto-categorized breakdown of where your money went | Success |
| **Forecast** | Projected spending for next month based on history | Success |

Landing page, wallet connection, dark/light mode, and ID/EN language
support are already live.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Wallet:** Direct EIP-1193 integration (MetaMask & OKX Wallet — no
  wagmi/viem, kept intentionally lightweight)
- **Theming:** next-themes
- **Deployment:** Vercel

## Arc Testnet

| | |
|---|---|
| Chain ID | `5042002` |
| RPC URL | `https://rpc.testnet.arc.network` |
| Explorer | [testnet.arcscan.app](https://testnet.arcscan.app) |
| Faucet | [faucet.circle.com](https://faucet.circle.com) |
| Gas token | USDC |

## Running Locally

You'll need Node.js ≥ 20, and a browser wallet (MetaMask or OKX Wallet)
configured for Arc Testnet.

```bash
git clone https://github.com/faqihrayhan/arc-nota.git
cd arc-nota
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/          # Routing & layout (Next.js App Router)
├── components/   # UI components
├── context/      # React Context (wallet, language)
├── lib/          # Config & helpers (chain config, etc.)
└── i18n/         # ID/EN translation strings
```

## Roadmap

- [x] Landing page & wallet connect
- [x] Dark/light mode
- [x] ID/EN language support
- [x] Payment (on-chain QR payments)
- [x] Insights (spending analysis)
- [x] Forecast

## Heads up

This runs on **Arc Testnet** — tokens and transactions here have **no
real value**. Purely for building and testing.

## Built on Arc

This project is built on [Arc](https://arc.io) infrastructure. See the
[Arc Brand Guidelines](https://www.arc.io/brand-guidelines-and-partner-toolkit)
for logo/name usage.

---

<sub>Built by [@faqihrayhan](https://github.com/faqihrayhan)</sub>