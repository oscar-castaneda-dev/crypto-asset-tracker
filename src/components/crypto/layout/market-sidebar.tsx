import { TopMovers } from "../top-movers/top-movers";
import { WalletConnect } from "../wallet/wallet-connect";

export function MarketSidebar() {
  return (
    <div className="w-full flex flex-col gap-y-6 lg:justify-between">
      <TopMovers />
      <WalletConnect />
    </div>
  );
}
