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
import { setSelectedCoin, setTopCoins } from "@/store/crypto/cryptoSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Coin, CoinDetail } from "@/types/crypto";

export function useInitialCryptoData(mainCoinId: string) {
  const dispatch = useAppDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchInitialCryptoData = async () => {
      try {
        const cachedTopCoinsByMarketCap = cache.get<Coin[]>(
          TOP_COINS_BY_MARKET_CAP
        );
        const cachedCoinDetail = cache.get<CoinDetail>(COIN_DETAIL);
        const cachedHistoricalData = cache.get<any>(HISTORICAL_DATA);

        const hasStoredData =
          cachedTopCoinsByMarketCap && cachedCoinDetail && cachedHistoricalData;

        if (hasStoredData) {
          dispatch(setTopCoins(cachedTopCoinsByMarketCap));
          dispatch(setSelectedCoin(cachedCoinDetail));
          setInitialLoading(false);
          return;
        }

        await Promise.all([
          dispatch(getTopCoins(20)),
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
  }, [dispatch, mainCoinId]);

  return { initialLoading };
}
