import { useEffect, useState } from "react";

import { Coin } from "@/types/crypto";
import { fetchTopCoins } from "@/services/coinService";

export function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopCoins = async () => {
      setLoading(true);
      try {
        const topCoins = await fetchTopCoins(10);
        setCoins(topCoins);
      } catch (error) {
        console.error("Failed to load top coins:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTopCoins();
  }, []);

  return (
    <div>
      <p>home page</p>
    </div>
  );
}
