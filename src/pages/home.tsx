import { useEffect, useState } from "react";

import { cache } from "@/helpers/cache";
import {
  COIN_DETAIL,
  HISTORICAL_DATA,
  TOP_COINS_BY_MARKET_CAP,
} from "@/constants/cacheKeys";
import {
  getCoinDetail,
  getHistoricalData,
  getTopCoins,
} from "@/store/crypto/cryptoThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export function Home() {
  const dispatch = useAppDispatch();

  const [initialLoading, setInitialLoading] = useState(true);
  const [mainCoinId, setMainCoinId] = useState<string>("bitcoin");

  useEffect(() => {
    const fetchInitialCryptoData = async () => {
      try {
        const cachedTopCoinsByMarketCap = cache.get<any[]>(
          TOP_COINS_BY_MARKET_CAP
        );
        const cachedCoinDetail = cache.get<any>(COIN_DETAIL);
        const cachedHistoricalData = cache.get<any>(HISTORICAL_DATA);

        const hasStoredData =
          cachedTopCoinsByMarketCap && cachedCoinDetail && cachedHistoricalData;

        if (hasStoredData) {
          if (process.env.NODE_ENV === "development") {
            console.log("Found valid cache, skipping API fetch.");
          }
          setInitialLoading(false);
          return;
        }

        if (process.env.NODE_ENV === "development") {
          console.log("No valid cache, fetching from API...");
        }

        await Promise.all([
          dispatch(getTopCoins(8)),
          dispatch(getCoinDetail(mainCoinId)),
          dispatch(getHistoricalData({ coinId: mainCoinId, range: "7d" })),
        ]);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching initial crypto data:", error);
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialCryptoData();
  }, []);

  return <div>{initialLoading ? <p>loading</p> : <p>home page</p>}</div>;
}
