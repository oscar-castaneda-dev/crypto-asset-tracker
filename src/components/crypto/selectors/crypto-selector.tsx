import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/hooks/useAppSelector";

interface CryptoSelectorProps {
  onSelect: (coinId: string) => void;
  selectedCoin?: string;
}

const CryptoSelector = ({ onSelect, selectedCoin }: CryptoSelectorProps) => {
  const { coins, loading, error } = useAppSelector((state) => state.crypto);

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
        onValueChange={onSelect}
        value={selectedCoin}
        disabled={loading || coins.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a cryptocurrency" />
        </SelectTrigger>
        <SelectContent>
          {coins.map((coin) => (
            <SelectItem key={coin.id} value={coin.id}>
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className=" size-5" />
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
};

export default CryptoSelector;
