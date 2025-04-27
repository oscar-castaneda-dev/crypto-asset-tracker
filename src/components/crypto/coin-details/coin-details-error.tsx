import { Card, CardContent } from "@/components/ui/card";

export function CoinDetailsError() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 text-center text-muted-foreground">
        Failed to load cryptocurrency details
      </CardContent>
    </Card>
  );
}
