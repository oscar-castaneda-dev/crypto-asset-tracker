import { Card, CardContent } from "@/components/ui/card";

interface TopMoversErrorProps {
  message?: string;
}

export function TopMoversError({ message }: TopMoversErrorProps) {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="text-center text-sm text-red-700">
          {message ?? "Failed to load top cryptocurrencies."}
        </div>
      </CardContent>
    </Card>
  );
}
