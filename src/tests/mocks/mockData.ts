export const mockCoins = [
  {
    ath: 108786,
    ath_change_percentage: -13.31137,
    ath_date: "2025-01-20T09:11:54.494Z",
    atl: 67.81,
    atl_change_percentage: 138973.9995,
    atl_date: "2013-07-06T00:00:00.000Z",
    circulating_supply: 19857225,
    current_price: 94452,
    fully_diluted_valuation: 1874245673058,
    high_24h: 95491,
    id: "bitcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    last_updated: "2025-04-28T14:11:28.451Z",
    low_24h: 92953,
    market_cap: 1874245673058,
    market_cap_change_24h: 6602015214,
    market_cap_change_percentage_24h: 0.35349,
    market_cap_rank: 1,
    max_supply: 21000000,
    name: "Bitcoin",
    price_change_24h: 418.67,
    price_change_percentage_24h: 0.44524,
    roi: null,
    symbol: "btc",
    total_supply: 19857225,
    total_volume: 26564503467,
  },
  {
    ath: 4878.26,
    ath_change_percentage: -63.30565,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 413325.67465,
    atl_date: "2015-10-20T00:00:00.000Z",
    circulating_supply: 120725290.8568705,
    current_price: 1790.86,
    fully_diluted_valuation: 216079496104,
    high_24h: 1821.94,
    id: "ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    last_updated: "2025-04-28T14:11:29.551Z",
    low_24h: 1760.54,
    market_cap: 216079496104,
    market_cap_change_24h: -907834323.7643738,
    market_cap_change_percentage_24h: -0.41838,
    market_cap_rank: 2,
    max_supply: null,
    name: "Ethereum",
    price_change_24h: -5.248662160275671,
    price_change_percentage_24h: -0.29222,
    roi: {
      times: 24.363854922770276,
      currency: "btc",
      percentage: 2436.3854922770274,
    },
    symbol: "eth",
    total_supply: 120725290.8568705,
    total_volume: 12267237439,
  },
];

export const mockSelectedCoin = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
  image: {
    small: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  market_data: {
    current_price: {
      usd: 50000,
    },
    price_change_percentage_24h: 2.5,
  },
  description: {
    en: "Bitcoin is a decentralized digital currency...",
  },
};

export const mockHistoricalData = {
  bitcoin: {
    labels: ["2025-04-20", "2025-04-21", "2025-04-22"],
    prices: [90000, 91000, 92000],
  },
};
