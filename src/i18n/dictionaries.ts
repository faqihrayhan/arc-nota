export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  id: "Indonesia",
  en: "English",
};

// Flat dot-path keys are easier to grep/refactor than deep nesting when
// the app is still small. Split this into per-feature files if it grows.
export const dictionaries: Record<Locale, Record<string, string>> = {
  id: {
    "nav.payment": "Payment",
    "nav.analisa": "Analisa Keuangan",
    "nav.forecast": "Forecast",

    "hero.badge": "Built on Arc · Testnet",
    "hero.title1": "Tiap transaksi jadi nota.",
    "hero.title2": "Tiap nota jadi wawasan.",
    "hero.desc":
      "Bayar pakai QR, catat otomatis on-chain, dan pahami ke mana uangmu pergi — lengkap dengan proyeksi bulan depan. Semuanya jalan di atas Arc, jaringan pembayaran stablecoin.",
    "hero.ctaSecondary": "Lihat fitur",
    "hero.chainNote": "Chain ID 5042002 · Gas dibayar pakai USDC",
    "hero.receipt.item1": "Kopi & roti",
    "hero.receipt.item2": "Parkir",
    "hero.receipt.total": "Total",
    "hero.receipt.stamp": "LUNAS",
    "hero.receipt.block": "Arc Testnet · blok #128.441",

    "features.eyebrow": "Tiga lembar, satu transaksi",
    "features.title": "Seperti nota rangkap tiga — cuma digital",
    "features.desc":
      "Satu transaksi menghasilkan tiga hal sekaligus: bukti bayar, data untuk dianalisa, dan bahan buat proyeksi ke depan.",
    "features.comingSoon": "Segera hadir",
    "features.payment.ply": "Lembar putih",
    "features.payment.title": "Payment",
    "features.payment.desc":
      "Tampilkan QR pembayaranmu untuk discan kasir. Setiap transaksi otomatis tercatat sebagai nota on-chain di Arc — gak perlu input manual.",
    "features.analisa.ply": "Lembar merah muda",
    "features.analisa.title": "Analisa Keuangan",
    "features.analisa.desc":
      "Semua nota dari fitur Payment dikelompokkan otomatis per kategori, biar kamu bisa lihat ke mana saja uangmu pergi bulan ini.",
    "features.forecast.ply": "Lembar kuning",
    "features.forecast.title": "Forecast",
    "features.forecast.desc":
      "Berdasarkan pola pengeluaran dari Analisa Keuangan, Nota memproyeksikan perkiraan pengeluaranmu bulan depan.",

    "wallet.connect": "Connect Wallet",
    "wallet.connecting": "Menghubungkan…",
    "wallet.pick": "Pilih wallet",
    "wallet.notDetected": "Tidak terdeteksi",
    "wallet.openInApp": "Buka di app",
    "wallet.notInstalled": "Wallet belum terpasang di browser ini.",
    "wallet.rejected": "Permintaan koneksi ditolak.",
    "wallet.connectedVia": "Terhubung via",
    "wallet.viewExplorer": "Lihat di ArcScan ↗",
    "wallet.disconnect": "Putuskan koneksi",
    "wallet.switchNetwork": "Ganti ke Arc Testnet",

    "footer.builtOn": "Built on Arc.",
    "footer.disclaimer": "Berjalan di Arc Testnet — token dan transaksi tidak bernilai nyata.",

    "theme.toggle": "Ganti tampilan",
    "lang.toggle": "Ganti bahasa",
  },
  en: {
    "nav.payment": "Payment",
    "nav.analisa": "Insights",
    "nav.forecast": "Forecast",

    "hero.badge": "Built on Arc · Testnet",
    "hero.title1": "Every purchase becomes a note.",
    "hero.title2": "Every note becomes insight.",
    "hero.desc":
      "Pay with a QR code, get it logged on-chain automatically, and see where your money actually goes — plus a projection for next month. All running on Arc, the stablecoin payments network.",
    "hero.ctaSecondary": "See features",
    "hero.chainNote": "Chain ID 5042002 · Gas paid in USDC",
    "hero.receipt.item1": "Coffee & pastry",
    "hero.receipt.item2": "Parking",
    "hero.receipt.total": "Total",
    "hero.receipt.stamp": "PAID",
    "hero.receipt.block": "Arc Testnet · block #128,441",

    "features.eyebrow": "Three sheets, one transaction",
    "features.title": "Like a triplicate receipt book — just digital",
    "features.desc":
      "One transaction produces three things at once: proof of payment, data to analyze, and material for a forecast.",
    "features.comingSoon": "Coming soon",
    "features.payment.ply": "White sheet",
    "features.payment.title": "Payment",
    "features.payment.desc":
      "Show your payment QR for the cashier to scan. Every transaction is automatically logged as an on-chain note on Arc — no manual entry needed.",
    "features.analisa.ply": "Pink sheet",
    "features.analisa.title": "Insights",
    "features.analisa.desc":
      "Every note from Payment gets grouped into categories automatically, so you can see exactly where your money went this month.",
    "features.forecast.ply": "Yellow sheet",
    "features.forecast.title": "Forecast",
    "features.forecast.desc":
      "Based on the spending patterns from Insights, Nota projects an estimate of what you'll spend next month.",

    "wallet.connect": "Connect Wallet",
    "wallet.connecting": "Connecting…",
    "wallet.pick": "Choose a wallet",
    "wallet.notDetected": "Not detected",
    "wallet.openInApp": "Open in app",
    "wallet.notInstalled": "This wallet isn't installed in this browser.",
    "wallet.rejected": "Connection request was rejected.",
    "wallet.connectedVia": "Connected via",
    "wallet.viewExplorer": "View on ArcScan ↗",
    "wallet.disconnect": "Disconnect",
    "wallet.switchNetwork": "Switch to Arc Testnet",

    "footer.builtOn": "Built on Arc.",
    "footer.disclaimer": "Running on Arc Testnet — tokens and transactions have no real value.",

    "theme.toggle": "Toggle theme",
    "lang.toggle": "Change language",
  },
};
