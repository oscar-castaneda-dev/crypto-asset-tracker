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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
