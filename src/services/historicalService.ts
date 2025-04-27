import { API_URL } from "@/config/api";
import { cache } from "@/helpers/cache";
import { COINGECKO_API_KEY } from "@/config/env";
import { HistoricalData, ChartData, TimeRange } from "@/types/crypto";
import { timeRangeToDays } from "@/helpers/timeRange";

export const fetchHistoricalData = async (
  coinId: string,
  range: TimeRange
): Promise<ChartData | null> => {
  if (!coinId) {
    console.error("No coinId provided to fetchHistoricalData");
    return null;
  }

  const days = timeRangeToDays(range);
  const cacheKey = `historicalData-${coinId}-${days}`;
  const cachedData = cache.get<ChartData>(cacheKey);

  if (cachedData) {
    console.log(`Using cached historical data for ${coinId} (${range})`);
    return cachedData;
  }

  try {
    console.log(
      `Fetching historical data for ${coinId} (${range}) from API...`
    );
    const response = await fetch(
      `${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily&x_cg_demo_api_key=${COINGECKO_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch historical data for ${coinId}: ${response.status} ${response.statusText}`
      );
    }

    const data: HistoricalData = await response.json();

    if (!data || !data.prices || !Array.isArray(data.prices)) {
      throw new Error("Invalid response format from API");
    }

    const chartData: ChartData = {
      labels: data.prices.map(([timestamp]) => {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      prices: data.prices.map(([, price]) => price),
    };

    cache.set(cacheKey, chartData);
    console.log(
      `Successfully fetched historical data for ${coinId} (${range})`
    );

    return chartData;
  } catch (error) {
    console.error(`Error fetching historical data for ${coinId}:`, error);
    return null;
  }
};

export const fetchMultipleHistoricalData = async (
  coinIds: string[],
  range: TimeRange
): Promise<{ [id: string]: ChartData | null }> => {
  console.log(
    `Fetching multiple historical data for: ${coinIds.join(", ")} (${range})`
  );

  const result: { [id: string]: ChartData | null } = {};

  for (const coinId of coinIds) {
    if (!coinId) continue;
    result[coinId] = await fetchHistoricalData(coinId, range);
  }

  return result;
};
