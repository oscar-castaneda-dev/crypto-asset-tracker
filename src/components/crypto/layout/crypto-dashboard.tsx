import { CoinDetails } from "../coin-details/coin-details";
import { CompareCryptoCard } from "../selectors/compare-crypto-card";
import { PriceChart } from "../charts/price-chart";
import { SelectCryptoCard } from "../selectors/select-crypto-card";

interface CryptoContentProps {
  mainCoinId: string;
  compareCoin?: string;
  handleCoinSelect: (coinId: string) => void;
  handleCompareCoinSelect: (coinId?: string) => void;
}

export function CryptoDashboard({
  mainCoinId,
  compareCoin,
  handleCoinSelect,
  handleCompareCoinSelect,
}: CryptoContentProps) {
  return (
    <div className="md:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 lg:mb-[74px]">
        <SelectCryptoCard
          mainCoinId={mainCoinId}
          handleCoinSelect={handleCoinSelect}
        />
        <CompareCryptoCard
          mainCoinId={mainCoinId}
          compareCoin={compareCoin}
          handleCompareCoinSelect={handleCompareCoinSelect}
        />
      </div>
      <CoinDetails />
      <PriceChart coinId={mainCoinId} compareCoinId={compareCoin} />
    </div>
  );
}
