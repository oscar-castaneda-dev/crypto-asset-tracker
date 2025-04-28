import { API_URL } from "@/config/api";
import { cache } from "@/helpers/cache";
import { Coin, CoinDetail } from "@/types/crypto";
import { COINGECKO_API_KEY } from "@/config/env";

export const fetchTopCoins = async (limit: number = 10): Promise<Coin[]> => {
  const cacheKey = `topCoinsByMarketCap-${limit}`;
  const cachedData = cache.get<Coin[]>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${COINGECKO_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch top coins by market cap: ${response.status} ${response.statusText}`
      );
    }

    const data: Coin[] = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response format from API");
    }

    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching top coins by market cap:", error);
    return [];
  }
};

export const fetchCoinDetail = async (
  coinId: string
): Promise<CoinDetail | null> => {
  if (!coinId) {
    console.error("No coinId provided to fetchCoinDetail");
    return null;
  }

  const cacheKey = `coinDetail-${coinId}`;
  const cachedData = cache.get<CoinDetail>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${API_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&x_cg_demo_api_key=${COINGECKO_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${coinId} details: ${response.status} ${response.statusText}`
      );
    }

    const data: CoinDetail = await response.json();

    if (!data || !data.id) {
      throw new Error("Invalid response format from API");
    }

    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error(`Error fetching ${coinId} details:`, error);
    return null;
  }
};
