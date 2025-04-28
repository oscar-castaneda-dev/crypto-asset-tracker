import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TopMoversSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          Top Cryptocurrencies by Market Cap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-11 w-[90%] rounded-md" />
        <Skeleton className="h-11 w-[80%] rounded-md" />
        <Skeleton className="h-11 w-[85%] rounded-md" />
        <Skeleton className="h-11 w-[70%] rounded-md" />
        <Skeleton className="h-11 w-[95%] rounded-md" />
        <Skeleton className="h-11 w-[75%] rounded-md" />
        <Skeleton className="h-11 w-[88%] rounded-md" />
        <Skeleton className="h-11 w-[78%] rounded-md" />
      </CardContent>
    </Card>
  );
}
