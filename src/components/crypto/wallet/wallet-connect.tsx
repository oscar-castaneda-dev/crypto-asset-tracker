import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Wallet } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { WalletStatus } from "./wallet-status";
import { WalletDetails } from "./wallet-details";
import { WalletError } from "./wallet-error";
import { WalletSkeleton } from "./wallet-skeleton";

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      toast.error(message);
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
      toast.error(message);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      const message = "MetaMask is not installed";
      setError(message);
      toast.error(message);
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
      toast.success("Wallet connected successfully");
    } catch (err: any) {
      const message = err?.message || "Failed to connect wallet";
      setError(message);
      toast.error(message);
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
    toast.success("Wallet disconnected");
  };

  if (!isMetaMaskInstalled) {
    return <WalletStatus />;
  }

  return (
    <Card className="w-full h-96 flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          {isConnected ? "Wallet Connected" : "Connect Wallet"}
        </CardTitle>
        <CardDescription>
          {isConnected
            ? "Your wallet is successfully connected"
            : "Connect your MetaMask wallet to manage assets"}
        </CardDescription>
      </CardHeader>

      {isLoading ? (
        <WalletSkeleton />
      ) : (
        <>
          <CardContent className="space-y-4">
            {error && <WalletError message={error} />}
            {isConnected ? (
              <WalletDetails
                walletAddress={walletAddress}
                balance={balance}
                chainId={chainId}
              />
            ) : (
              <div className="p-8 border rounded-md bg-muted flex flex-col items-center text-center">
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
        </>
      )}
    </Card>
  );
}
