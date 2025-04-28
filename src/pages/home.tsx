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
import { Header } from "@/components/layout/header";
import { MarketSidebar } from "@/components/crypto/layout/market-sidebar";
import { CryptoDashboard } from "@/components/crypto/layout/crypto-dashboard";
import {
  setHistoricalData,
  setSelectedCoin,
  setTopCoins,
} from "@/store/crypto/cryptoSlice";

export function Home() {
  const dispatch = useAppDispatch();

  const [initialLoading, setInitialLoading] = useState(true);
  const [mainCoinId, setMainCoinId] = useState<string>("bitcoin");
  const [compareCoin, setCompareCoin] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchInitialCryptoData = async () => {
      try {
        const cachedTopCoinsByMarketCap = cache.get<any>(
          TOP_COINS_BY_MARKET_CAP
        );
        const cachedCoinDetail = cache.get<any>(COIN_DETAIL);
        const cachedHistoricalData = cache.get<any>(HISTORICAL_DATA);

        const hasStoredData =
          cachedTopCoinsByMarketCap && cachedCoinDetail && cachedHistoricalData;

        if (hasStoredData) {
          if (process.env.NODE_ENV === "development") {
            console.log("Found valid cache, hydrating Redux...");
          }

          dispatch(setTopCoins(cachedTopCoinsByMarketCap));
          dispatch(setSelectedCoin(cachedCoinDetail));
          dispatch(setHistoricalData(cachedHistoricalData));

          setInitialLoading(false);
          return;
        }

        if (process.env.NODE_ENV === "development") {
          console.log("No valid cache, fetching from API...");
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
  }, []);

  useEffect(() => {
    if (!initialLoading) {
      if (mainCoinId) {
        dispatch(getCoinDetail(mainCoinId));
        dispatch(getHistoricalData({ coinId: mainCoinId, range: "7d" }));
      }

      if (compareCoin) {
        dispatch(getHistoricalData({ coinId: compareCoin, range: "7d" }));
      }
    }
  }, [dispatch, mainCoinId, compareCoin, initialLoading]);

  const handleCoinSelect = (coinId: string) => {
    setMainCoinId(coinId);

    if (coinId === compareCoin) {
      setCompareCoin(undefined);
    }
  };

  const handleCompareCoinSelect = (coinId?: string) => {
    if (coinId === mainCoinId) {
      setCompareCoin(undefined);
    } else {
      setCompareCoin(coinId);
    }
  };

  return (
    <main className="container mx-auto py-10">
      <Header />
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
        {/* left column */}
        <div className="md:col-span-2 space-y-6">
          <CryptoDashboard
            mainCoinId={mainCoinId}
            compareCoin={compareCoin}
            handleCoinSelect={handleCoinSelect}
            handleCompareCoinSelect={handleCompareCoinSelect}
          />
        </div>
        {/* right column */}
        <div>
          <MarketSidebar />
        </div>
      </div>
    </main>
  );
}
