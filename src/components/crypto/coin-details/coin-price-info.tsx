interface CoinPriceInfoProps {
  price: number;
  priceChange: number;
}

export function CoinPriceInfo({ price, priceChange }: CoinPriceInfoProps) {
  const priceChangeColor = priceChange >= 0 ? "text-green-500" : "text-red-500";
  const priceChangeSymbol = priceChange >= 0 ? "+" : "";

  return (
    <div className="text-right">
      <div className="text-xl font-bold">${price.toLocaleString()}</div>
      <div className={`text-sm ${priceChangeColor}`}>
        {priceChangeSymbol}
        {priceChange.toFixed(2)}%
      </div>
    </div>
  );
}
