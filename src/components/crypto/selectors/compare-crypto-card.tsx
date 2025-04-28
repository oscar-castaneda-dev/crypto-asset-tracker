import { Card, CardContent } from "@/components/ui/card";
import { CompareCryptoSelector } from "./compare-crypto-selector";

interface CompareCryptoCardProps {
  mainCoinId: string;
  compareCoin?: string;
  handleCompareCoinSelect: (coinId?: string) => void;
}

export function CompareCryptoCard({
  mainCoinId,
  compareCoin,
  handleCompareCoinSelect,
}: CompareCryptoCardProps) {
  return (
    <Card>
      <CardContent className="px-4 py-0.5">
        <h2 className="text-lg font-semibold mb-4">
          Compare with another Cryptocurrency
        </h2>
        <CompareCryptoSelector
          onSelect={handleCompareCoinSelect}
          selectedCoin={compareCoin}
          excludeCoinId={mainCoinId}
        />
      </CardContent>
    </Card>
  );
}
