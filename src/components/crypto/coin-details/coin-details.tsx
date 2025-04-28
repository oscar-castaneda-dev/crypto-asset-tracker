import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CoinDetailsError } from "./coin-details-error";
import { CoinDetailsSkeleton } from "./coin-details-skeleton";
import { CoinPriceInfo } from "./coin-price-info";
import { useAppSelector } from "@/hooks/useAppSelector";

export function CoinDetails() {
  const { selectedCoin, loading, error } = useAppSelector(
    (state) => state.crypto
  );

  if (loading || !selectedCoin) {
    return <CoinDetailsSkeleton />;
  }

  if (error) {
    toast.error("An error has occurred", {
      description: error ?? "Failed to load cryptocurrency details",
    });
    return <CoinDetailsError />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <img
            src={selectedCoin.image.small}
            alt={selectedCoin.name}
            className="size-8"
          />
          <div>
            <h2 className="text-xl font-bold">{selectedCoin.name}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedCoin.symbol.toUpperCase()}
            </p>
          </div>
        </div>
        <CoinPriceInfo
          price={selectedCoin.market_data.current_price.usd}
          priceChange={selectedCoin.market_data.price_change_percentage_24h}
        />
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {selectedCoin.description.en}
        </div>
      </CardContent>
    </Card>
  );
}
