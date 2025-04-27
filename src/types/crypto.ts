export interface CryptoState {
  coins: Coin[];
  selectedCoin: CoinDetail | null;
  chartData: ChartData;
  loading: boolean;
  error: string | null;
  topCoins: {
    data: Coin[];
    loading: boolean;
    error: string | null;
  };
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
  description: {
    en: string;
  };
}

export interface HistoricalData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ChartData {
  labels: string[];
  prices: number[];
  compareData?: number[];
}

export type TimeRange = "1d" | "7d" | "14d" | "30d" | "90d" | "1y";
