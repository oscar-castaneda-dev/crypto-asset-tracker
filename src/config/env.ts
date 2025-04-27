export const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

if (!COINGECKO_API_KEY) {
  throw new Error("VITE_COINGECKO_API_KEY is not defined");
}
