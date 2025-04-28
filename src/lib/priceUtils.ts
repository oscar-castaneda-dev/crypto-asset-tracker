export const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const getLineColor = (id: string) => {
  switch (id) {
    case "bitcoin":
      return "#facc15";
    case "ethereum":
      return "#818cf8";
    case "tether":
    case "usdt":
      return "#2dd4bf";
    case "xrp":
      return "#64748b";
    case "binancecoin":
    case "bnb":
      return "#fcd34d";
    case "solana":
      return "#60a5fa";
    case "usd-coin":
    case "usdc":
      return "#3b82f6";
    case "dogecoin":
      return "#fbbf24";
    case "cardano":
    case "ada":
      return "#38bdf8";
    case "tron":
    case "trx":
      return "#f87171";
    case "lido-staked-ether":
    case "steth":
      return "#7dd3fc";
    case "wrapped-bitcoin":
    case "wbtc":
      return "#f59e0b";
    case "sui":
      return "#38bdf8";
    case "chainlink":
    case "link":
      return "#3b82f6";
    case "avalanche-2":
    case "avax":
      return "#ef4444";
    case "stellar":
    case "xlm":
      return "#d1d5db";
    case "leo-token":
    case "leo":
      return "#6b21a8";
    case "toncoin":
    case "ton":
      return "#60a5fa";
    case "hedera-hashgraph":
    case "hbar":
      return "#000000";
    case "shiba-inu":
    case "shib":
      return "#f97316";
    default:
      return "#a855f7";
  }
};
