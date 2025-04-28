import { formatAddress, getNetworkName } from "@/lib/walletUtils";

interface WalletDetailsProps {
  walletAddress: string;
  balance: string;
  chainId: string;
}

export function WalletDetails({
  walletAddress,
  balance,
  chainId,
}: WalletDetailsProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
