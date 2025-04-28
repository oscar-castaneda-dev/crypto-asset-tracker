import { Card, CardContent } from "@/components/ui/card";
import CryptoSelector from "./crypto-selector";

interface SelectCryptoCardProps {
  mainCoinId: string;
  handleCoinSelect: (coinId: string) => void;
}

export function SelectCryptoCard({
  mainCoinId,
  handleCoinSelect,
}: SelectCryptoCardProps) {
  return (
    <Card>
      <CardContent className="px-4 py-0.5">
        <h2 className="text-lg font-semibold mb-4">Select a Cryptocurrency</h2>
        <CryptoSelector onSelect={handleCoinSelect} selectedCoin={mainCoinId} />
      </CardContent>
    </Card>
  );
}
