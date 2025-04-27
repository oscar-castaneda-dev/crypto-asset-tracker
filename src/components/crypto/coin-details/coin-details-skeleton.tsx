import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CoinDetailsSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 flex flex-col justify-center gap-y-4">
        <Skeleton className="h-6 w-2xs" />
        <Skeleton className="h-6 w-full" />
      </CardContent>
    </Card>
  );
}
