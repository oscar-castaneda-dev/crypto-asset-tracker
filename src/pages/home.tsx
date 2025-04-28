import { useState } from "react";

import { useInitialCryptoData } from "@/hooks/useInitialCryptoData";
import { useCoinSelection } from "@/hooks/useCoinSelection";

import { Header } from "@/components/layout/header";
import { MarketSidebar } from "@/components/crypto/layout/market-sidebar";
import { CryptoDashboard } from "@/components/crypto/layout/crypto-dashboard";

export function Home() {
  const [mainCoinId, setMainCoinId] = useState<string>("ethereum");
  const [compareCoin, setCompareCoin] = useState<string | undefined>(undefined);

  const { initialLoading } = useInitialCryptoData(mainCoinId);
  useCoinSelection(mainCoinId, compareCoin, initialLoading);

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
    <main className="container mx-auto p-10">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6">
        <CryptoDashboard
          mainCoinId={mainCoinId}
          compareCoin={compareCoin}
          handleCoinSelect={handleCoinSelect}
          handleCompareCoinSelect={handleCompareCoinSelect}
        />
        <MarketSidebar />
      </div>
    </main>
  );
}
