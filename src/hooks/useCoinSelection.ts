import { useEffect } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getCoinDetail, getHistoricalData } from "@/store/crypto/cryptoThunks";

export function useCoinSelection(
  mainCoinId: string,
  compareCoin?: string,
  initialLoading?: boolean
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!initialLoading) {
      if (mainCoinId) {
        dispatch(getCoinDetail(mainCoinId));
        dispatch(getHistoricalData({ coinId: mainCoinId, range: "7d" }));
      }
      if (compareCoin) {
        dispatch(getHistoricalData({ coinId: compareCoin, range: "7d" }));
      }
    }
  }, [dispatch, mainCoinId, compareCoin, initialLoading]);
}
