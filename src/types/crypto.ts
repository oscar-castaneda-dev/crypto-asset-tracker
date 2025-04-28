export interface ChartData {
  labels: string[];
  prices: number[];
  compareData?: number[];
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<
    string,
    {
      decimal_place: number | null;
      contract_address: string;
    }
  >;
  block_time_in_minutes: number;
  hashing_algorithm: string | null;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    snapshot_url: string | null;
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  status_updates: any[];
  last_updated: string;
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
}
export interface CryptoState {
  coins: Coin[];
  selectedCoin: CoinDetail | null;
  historicalData: {
    [coinId: string]: {
      labels: string[];
      prices: number[];
    };
  };
  loading: boolean;
  error: string | null;
  topCoins: {
    data: Coin[];
    loading: boolean;
    error: string | null;
  };
}

export interface HistoricalData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export type TimeRange = "1d" | "7d" | "14d" | "30d" | "90d" | "1y";
