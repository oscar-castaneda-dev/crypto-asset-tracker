import { ArrowUp, ArrowDown } from "lucide-react";

import { Coin } from "@/types/crypto";

interface CoinListItemProps {
  coin: Coin;
}

export function CoinListItem({ coin }: CoinListItemProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="size-8" />
        <div>
          <div className="font-medium">{coin.name}</div>
          <div className="text-sm text-muted-foreground">
            {coin.symbol.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-medium">
          ${coin.current_price.toLocaleString()}
        </div>
        <div
          className={`flex items-center text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUp className="size-3 mr-1" />
          ) : (
            <ArrowDown className="size-3 mr-1" />
          )}
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
