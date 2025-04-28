import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useAppSelector";
import { CoinListItem } from "./coin-list-item";
import { TopMoversSkeleton } from "./top-movers-skeleton";
import { TopMoversError } from "./top-movers-error";

export function TopMovers() {
  const {
    data: coins,
    loading,
    error,
  } = useAppSelector((state) => state.crypto.topCoins);

  if (loading) {
    return <TopMoversSkeleton />;
  }

  if (error) {
    return <TopMoversError message={error} />;
  }

  const topCoins = coins.slice(0, 5);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          {`Top ${topCoins.length} Cryptocurrencies by Market Cap`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topCoins.map((coin) => (
          <CoinListItem key={coin.id} coin={coin} />
        ))}
      </CardContent>
    </Card>
  );
}
