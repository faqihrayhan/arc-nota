import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase credentials not found. Payment features will use localStorage fallback."
  );
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Fallback: localStorage-based storage kalau Supabase belum setup
const STORAGE_KEY = "arc-nota:transactions";

export type Transaction = {
  id: string;
  payer_address: string;
  payee_address: string;
  amount: number;
  category: string;
  items: { name: string; price: number }[];
  tx_hash: string;
  block_hash: string;
  block_number: number;
  status: "pending" | "confirmed" | "failed";
  mode: "payment" | "receive";
  created_at: string;
  expires_at?: string;
  // nonce dari QR yang di-scan — dipakai sisi generator untuk tahu
  // QR mana yang baru saja "lunas" tanpa harus reload manual.
  nonce?: string;
};

// Dipanggil sisi yang men-generate QR untuk cek apakah nonce tertentu
// sudah punya transaksi yang cocok (artinya sudah dibayar).
export async function findTransactionByNonce(
  nonce: string
): Promise<Transaction | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("nonce", nonce)
      .maybeSingle();
    if (error) return null;
    return data;
  }
  return getLocalTransactions().find((t) => t.nonce === nonce) || null;
}

// Berlangganan perubahan tabel transactions secara realtime (kalau Supabase
// aktif). Mengembalikan function `unsubscribe` untuk dipanggil saat komponen
// unmount, supaya tidak ada listener yang "nyangkut".
export function subscribeToTransactions(onInsert: () => void): () => void {
  if (!supabase) return () => {};
  const channel = supabase
    .channel("transactions-changes")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "transactions" },
      onInsert
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

export async function saveTransaction(tx: Transaction): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from("transactions").insert(tx);
    if (error) throw error;
    return;
  }
  // Fallback localStorage
  const existing = getLocalTransactions();
  existing.push(tx);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export async function getTransactions(address: string): Promise<Transaction[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`payer_address.eq.${address},payee_address.eq.${address}`)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }
  // Fallback localStorage
  return getLocalTransactions().filter(
    (t) => t.payer_address === address || t.payee_address === address
  );
}

export async function getTransactionByTxHash(txHash: string): Promise<Transaction | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("tx_hash", txHash)
      .single();
    if (error) return null;
    return data;
  }
  return getLocalTransactions().find((t) => t.tx_hash === txHash) || null;
}

function getLocalTransactions(): Transaction[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}