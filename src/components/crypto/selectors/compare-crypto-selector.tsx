import { toast } from "sonner";

import { useAppSelector } from "@/hooks/useAppSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface CompareCryptoSelectorProps {
  onSelect: (coinId: string | undefined) => void;
  selectedCoin?: string;
  excludeCoinId?: string;
}

export function CompareCryptoSelector({
  onSelect,
  selectedCoin,
  excludeCoinId,
}: CompareCryptoSelectorProps) {
  const { coins, loading, error } = useAppSelector((state) => state.crypto);

  const filteredCoins = coins.filter((coin) => coin.id !== excludeCoinId);

  if (loading) {
    return <Skeleton className="h-8 w-full" />;
  }

  if (error) {
    toast.error("An error has occurred", {
      description: error ?? "Failed to load cryptocurrency options",
    });

    return (
      <div className="w-full text-center text-sm text-muted-foreground py-4">
        Failed to load cryptocurrency options
      </div>
    );
  }

  return (
    <div className="w-full">
      <Select
        onValueChange={(value) =>
          onSelect(value === "none" ? undefined : value)
        }
        value={selectedCoin || "none"}
        disabled={loading || filteredCoins.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Compare with..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None (no comparison)</SelectItem>
          {filteredCoins.map((coin) => (
            <SelectItem key={coin.id} value={coin.id}>
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="size-5" />
                <span>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
