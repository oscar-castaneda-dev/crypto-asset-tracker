import { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  AlertCircle,
  ExternalLink,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { coins } = useAppSelector((state) => state.crypto);

  const ethereumCoin = useMemo(
    () => coins.find((coin) => coin.id === "ethereum"),
    [coins]
  );

  const ethPrice = ethereumCoin?.current_price ?? 0;
  const priceChange24h = ethereumCoin?.price_change_percentage_24h ?? 0;

  const portfolioValue =
    balance && ethPrice ? Number.parseFloat(balance) * ethPrice : 0;

  const LOCAL_STORAGE_KEY = "walletDisconnected";

  useEffect(() => {
    checkMetaMaskInstallation();
    checkInitialConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const checkMetaMaskInstallation = () => {
    if (!window.ethereum?.isMetaMask) {
      setIsMetaMaskInstalled(false);
    }
  };

  const checkInitialConnection = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const manuallyDisconnected =
        localStorage.getItem(LOCAL_STORAGE_KEY) === "true";

      if (accounts.length > 0 && !manuallyDisconnected) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        await fetchWalletInfo(accounts[0]);
      }
    } catch (err: any) {
      const message = err?.message || "Failed to check initial connection";
      setError(message);
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      await fetchWalletInfo(accounts[0]);
    }
  };

  const handleChainChanged = async (chainIdHex: string) => {
    setChainId(parseInt(chainIdHex, 16).toString());
    if (walletAddress) {
      await fetchWalletInfo(walletAddress);
    }
  };

  const fetchWalletInfo = async (address: string) => {
    if (!window.ethereum) return;

    try {
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const balanceInEth = parseInt(balanceHex, 16) / 1e18;
      setBalance(balanceInEth.toFixed(4));

      const chainIdHex = await window.ethereum.request({
        method: "eth_chainId",
      });
      setChainId(parseInt(chainIdHex, 16).toString());
    } catch (err: any) {
      const message = err?.message || "Failed to fetch wallet info";
      setError(message);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      const message = "MetaMask is not installed";
      setError(message);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      await fetchWalletInfo(accounts[0]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err: any) {
      const message = err?.message || "Failed to connect wallet";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setIsConnected(false);
    setBalance("");
    setChainId("");
    localStorage.setItem(LOCAL_STORAGE_KEY, "true");
  };

  const getNetworkName = (chainId: string) => {
    const networks: { [key: string]: string } = {
      "1": "Ethereum Mainnet",
      "5": "Goerli Testnet",
      "11155111": "Sepolia Testnet",
      "137": "Polygon Mainnet",
      "80001": "Mumbai Testnet",
      "42161": "Arbitrum One",
      "10": "Optimism",
      "56": "BNB Smart Chain",
      "43114": "Avalanche C-Chain",
    };

    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  if (!isMetaMaskInstalled) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </CardTitle>
          <CardDescription>
            Connect MetaMask to access your digital assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>MetaMask not detected</AlertTitle>
            <AlertDescription>
              Install MetaMask extension to use this feature.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() =>
              window.open("https://metamask.io/download/", "_blank")
            }
          >
            Install MetaMask
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          {isConnected ? "Wallet Connected" : "Connect Wallet"}
        </CardTitle>
        <CardDescription>
          {isConnected
            ? "Your wallet is successfully connected"
            : "Connect your wallet to access your digital assets"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isConnected ? (
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="p-4 border rounded-md bg-muted">
                <p className="text-sm font-medium mb-1">Address:</p>
                <p className="text-sm font-mono break-all">{walletAddress}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ({formatAddress(walletAddress)})
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-md bg-muted">
                  <p className="text-sm font-medium mb-1">Balance:</p>
                  <p className="text-sm">{balance} ETH</p>
                </div>

                <div className="p-4 border rounded-md bg-muted">
                  <p className="text-sm font-medium mb-1">Network:</p>
                  <p className="text-sm">{getNetworkName(chainId)}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="p-4 border rounded-md bg-muted">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Portfolio Value</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">
                  ${portfolioValue.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-md bg-muted">
                  <p className="text-sm font-medium mb-1">ETH Price:</p>
                  <p className="text-lg font-semibold">
                    ${ethPrice.toFixed(2)}
                  </p>
                </div>

                <div className="p-4 border rounded-md bg-muted">
                  <p className="text-sm font-medium mb-1">24h Change:</p>
                  <div className="flex items-center">
                    <p
                      className={`text-lg font-semibold ${
                        priceChange24h >= 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {priceChange24h.toFixed(2)}%
                    </p>
                    {priceChange24h >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-green-700 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-700 ml-1" />
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-muted">
                <p className="text-sm font-medium mb-2">
                  Estimated Performance:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm">Value 24h ago:</p>
                    <p className="text-sm font-medium">
                      $
                      {(portfolioValue / (1 + priceChange24h / 100)).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Current Value:</p>
                    <p className="text-sm font-medium">
                      ${portfolioValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <p className="text-sm font-medium">Profit/Loss:</p>
                    <p
                      className={`text-sm font-medium ${
                        priceChange24h >= 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      ${((portfolioValue * priceChange24h) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="p-8 border rounded-md bg-muted flex flex-col items-center justify-center text-center">
            <Wallet className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              Connect your MetaMask wallet to view your information
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isConnected ? (
          <Button
            variant="destructive"
            className="w-full"
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={connectWallet}
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect MetaMask"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
