import { Wallet, AlertCircle, ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function WalletStatus() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </CardTitle>
        <CardDescription>
          Connect MetaMask to access your assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>MetaMask not detected</AlertTitle>
          <AlertDescription>
            Install the MetaMask extension to use this feature.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => window.open("https://metamask.io/download/", "_blank")}
        >
          Install MetaMask
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
