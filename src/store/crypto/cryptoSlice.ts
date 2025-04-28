import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTopCoins, getCoinDetail, getHistoricalData } from "./cryptoThunks";
import type { Coin, CoinDetail } from "@/types/crypto";
import type { CryptoState } from "@/types/crypto";

const initialState: CryptoState = {
  coins: [],
  selectedCoin: null,
  historicalData: {},
  loading: false,
  error: null,
  topCoins: {
    data: [],
    loading: false,
    error: null,
  },
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setTopCoins: (state, action: PayloadAction<Coin[]>) => {
      state.topCoins.data = action.payload;
      state.coins = action.payload;
    },
    setSelectedCoin: (state, action: PayloadAction<CoinDetail>) => {
      state.selectedCoin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopCoins.pending, (state) => {
        state.topCoins.loading = true;
        state.topCoins.error = null;
      })
      .addCase(
        getTopCoins.fulfilled,
        (state, action: PayloadAction<Coin[]>) => {
          state.topCoins.loading = false;
          state.topCoins.data = action.payload;
          state.coins = action.payload;
        }
      )
      .addCase(getTopCoins.rejected, (state, action) => {
        state.topCoins.loading = false;
        state.topCoins.error = action.payload || "Failed to fetch top coins";
      })

      .addCase(getCoinDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCoinDetail.fulfilled,
        (state, action: PayloadAction<CoinDetail>) => {
          state.loading = false;
          state.selectedCoin = action.payload;
        }
      )
      .addCase(getCoinDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coin detail";
      })

      .addCase(getHistoricalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getHistoricalData.fulfilled,
        (
          state,
          action: PayloadAction<{
            labels: string[];
            prices: number[];
            coinId: string;
          }>
        ) => {
          state.loading = false;
          const { labels, prices, coinId } = action.payload;
          state.historicalData[coinId] = { labels, prices };
        }
      )
      .addCase(getHistoricalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch historical data";
      });
  },
});

export const { setTopCoins, setSelectedCoin } = cryptoSlice.actions;
export default cryptoSlice.reducer;
