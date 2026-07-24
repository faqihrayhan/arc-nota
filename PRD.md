# PRD: Nota — Catatan Pembayaran & Analisa Keuangan di Arc

**Status dokumen:** Draft awal, disusun dari diskusi eksplorasi awal project.
Bagian yang ditandai 🟡 **BELUM DIPUTUSKAN** perlu diisi/dikonfirmasi Raymoon
sebelum jadi acuan build fitur inti.

---

## 1. Ringkasan Produk

Nota adalah aplikasi web pencatatan & analisa pengeluaran pribadi yang
berjalan di atas **Arc Testnet**. Pengguna membayar transaksi sehari-hari
lewat QR code (ditampilkan ke kasir, mirip QRIS), dan setiap transaksi
otomatis tercatat sebagai "nota" digital. Dari kumpulan nota itu, aplikasi
menyediakan analisa pengeluaran dan proyeksi (forecast) untuk bulan
berikutnya.

**Analogi produk:** nota rangkap tiga ala toko Indonesia (putih/pink/kuning)
— satu transaksi, tiga kegunaan: bukti bayar, bahan analisa, bahan proyeksi.

## 2. Masalah yang Diselesaikan

Pengguna crypto/stablecoin biasanya kesulitan melacak ke mana uangnya
pergi karena transaksi tersebar di banyak wallet/exchange tanpa
pengelompokan otomatis. Nota menyatukan pembayaran + pencatatan +
analisa dalam satu alur, tanpa input manual.

## 3. Target Pengguna

✅ **DIPUTUSKAN:** Fokus personal — Nota tetap satu produk, gak ada
aplikasi merchant terpisah. "Kasir" dalam skenario Payment adalah
**sesama pengguna Nota** yang membuka mode "Terima Pembayaran" di app
yang sama (misal teman/keluarga, atau device kedua) — bukan toko
sungguhan dengan sistem kasir sendiri. Cocok buat tahap testnet, karena
toko sungguhan belum ada yang terima Arc USDC.

## 4. Prinsip Desain

- Bahasa utama: Indonesia (dengan opsi English)
- Identitas visual: motif nota rangkap 3 (putih/pink/kuning), bukan
  tema "crypto dark neon" generik
- Branding: "Nota" adalah nama produk; Arc diposisikan sebagai
  infrastruktur di baliknya ("Built on Arc") — lihat Arc Brand Guidelines
  di `CLAUDE.md`
- Aksesibel dari desktop maupun mobile browser

## 5. Fitur

### 5.1 Payment (belum dibangun)
**Deskripsi:** Pengguna menampilkan QR code pembayaran untuk discan oleh
pengguna Nota lain yang berperan sebagai "kasir" (mode "Terima
Pembayaran" di app yang sama). Begitu pembayaran selesai, transaksi
otomatis tercatat sebagai nota.

**Model yang dipilih:** ✅ Pull/allowance — pembayar (yang nunjukin QR)
memberi izin (allowance), kasir yang scan & menarik dana sejumlah yang
disepakati.

**User flow (draf, sudah termasuk konsekuensi teknis dari model pull):**
1. Pembayar buka menu Payment, masukkan jumlah yang mau dibayar
2. Pembayar sign transaksi **`approve`** — ini mengizinkan jumlah
   tersebut bisa ditarik (transaksi #1, ditandatangani pembayar,
   pembayar yang bayar gas-nya)
3. App generate QR berisi info: alamat pembayar + jumlah yang di-approve
4. Kasir buka mode "Terima Pembayaran" di Nota, scan QR tadi
5. Kasir sign transaksi **`transferFrom`** — ini yang benar-benar
   menarik dananya (transaksi #2, ditandatangani KASIR, jadi **kasir
   yang bayar gas** untuk step ini — kecuali nanti diputuskan pakai
   relayer)
6. Setelah kedua transaksi terkonfirmasi, otomatis tersimpan sebagai
   nota di kedua sisi (pembayar & kasir)

> **Catatan penting:** model pull ini artinya ada **2 kali tanda tangan
> wallet** (approve + transferFrom), bukan 1 kali kayak transfer
> biasa. Ini trade-off yang disadari & diterima demi UX "pembayar yang
> nunjukin QR" — kalau nanti kerasa kurang smooth, gampang balik ke
> model push (kasir tunjukin QR, pembayar scan & transfer — cuma 1
> tanda tangan) tanpa harus dirombak total.

**🟡 BELUM DIPUTUSKAN — sisa detail teknis:**
- Siapa yang bayar gas buat step `transferFrom` (kasir langsung, atau
  nanti ada mekanisme relayer supaya kasir gak perlu pegang gas)?
- QR-nya sekali pakai (expired setelah di-scan / ada batas waktu) atau
  bisa dipakai berkali-kali sampai allowance habis?
- Kategori pengeluaran (misal "makan", "transport") — diisi manual oleh
  pembayar, atau auto-detect dari nama/label kasir?
- Data "nota" (item, harga per item seperti di mockup hero) — sudah
  diputuskan **off-chain** (lihat §5.1 poin data), tapi skema
  database-nya (field apa aja) belum dirancang.

### 5.2 Analisa Keuangan (belum dibangun)
**Deskripsi:** Semua nota dari fitur Payment dikelompokkan otomatis per
kategori, ditampilkan sebagai ringkasan (mis. grafik/breakdown per
bulan).

**🟡 BELUM DIPUTUSKAN:**
- Bentuk tampilan: grafik (pie/bar chart), tabel, atau keduanya?
- Rentang waktu default (mingguan/bulanan)?
- Sumber data: hanya dari nota yang dibuat lewat fitur Payment Nota,
  atau juga mau nge-scan histori transaksi wallet yang sudah ada
  sebelumnya di Arc?

### 5.3 Forecast (belum dibangun)
**Deskripsi:** Berdasarkan pola dari Analisa Keuangan, memproyeksikan
perkiraan pengeluaran bulan depan.

**🟡 BELUM DIPUTUSKAN:**
- Metode proyeksi: rata-rata sederhana dari bulan-bulan sebelumnya, atau
  model yang lebih canggih (perlu histori data minimal berapa bulan
  supaya proyeksinya masuk akal)?
- Ditampilkan sebagai angka tunggal, rentang (estimasi rendah-tinggi),
  atau breakdown per kategori?

## 6. Yang Sudah Dibangun (v0 — landing & fondasi)

- [x] Landing page (hero, penjelasan 3 fitur sebagai preview "Segera hadir")
- [x] Connect wallet — MetaMask & OKX Wallet, auto-detect & switch ke Arc Testnet
- [x] Dark/light mode
- [x] Bahasa ID/EN
- [x] `CLAUDE.md` — konteks project untuk Claude Code

## 7. Batasan Teknis / Constraints

- Network: Arc Testnet (Chain ID 5042002), EVM-compatible, gas dibayar
  USDC. Detail di `src/lib/arc-chain.ts`.
- Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, custom
  EIP-1193 wallet integration (bukan wagmi)
- Ini masih **testnet** — token/transaksi tidak bernilai nyata. Perlu
  keputusan terpisah sebelum ada rencana ke mainnet (audit kontrak kalau
  ada, dsb.)

## 8. Non-Goals (di luar scope v1)

- Bukan exchange/DEX — Nota tidak menyediakan swap/trading
- Bukan wallet — Nota tidak menyimpan private key, selalu lewat wallet
  eksternal (MetaMask/OKX)
- Belum menyasar sisi merchant/kasir sebagai aplikasi terpisah (lihat §3)

## 9. Pertanyaan Terbuka — Prioritas Diputusin Duluan

**Sudah diputuskan (lihat §3 & §5.1):**
1. ~~Model transaksi~~ → Pull/allowance, kasir = sesama user Nota
2. ~~Data nota on-chain vs off-chain~~ → Off-chain (database); hanya
   transaksi `approve`+`transferFrom` yang on-chain
3. ~~Target pengguna~~ → Personal, satu produk (bukan app merchant terpisah)

**Sisa yang perlu diputusin sebelum mulai coding fitur Payment:**
1. Siapa bayar gas buat `transferFrom` (kasir, atau relayer)
2. QR sekali pakai atau bisa dipakai berulang
3. Skema data nota di database (field: jumlah, kategori, timestamp, siapa
   kasirnya, dll — perlu dirancang)
4. Kategori pengeluaran: manual atau auto-detect

---
*Dokumen ini hidup — update tiap ada keputusan baru, jangan biarin basi.
Simpan di root project sebagai `PRD.md`, dan upload ke Claude Projects
knowledge base biar selalu jadi acuan tiap sesi.*
