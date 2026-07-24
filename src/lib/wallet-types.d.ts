// Minimal EIP-1193 provider typing. Kept loose on purpose (this is a
// simple/starter integration) — tighten this up if the project grows.
interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
  isMetaMask?: boolean;
  providers?: Eip1193Provider[];
}

interface Window {
  ethereum?: Eip1193Provider;
  okxwallet?: Eip1193Provider & { ethereum?: Eip1193Provider };
}
