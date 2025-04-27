import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getTopCoins, getCoinDetail, getHistoricalData } from "./cryptoThunks";
import type { CryptoState } from "@/types/crypto";

export const initialState: CryptoState = {
  coins: [],
  selectedCoin: null,
  chartData: null,
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Top coins
      .addCase(getTopCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
        if (process.env.NODE_ENV === "development") {
          console.log("Redux: Processing getTopCoins.pending");
        }
      })
      .addCase(getTopCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Redux: Processing getTopCoins.fulfilled, coins:",
            action.payload.length
          );
        }
      })
      .addCase(getTopCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coins";
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Redux: Processing getTopCoins.rejected, error:",
            state.error
          );
        }
      })

      // Coin detail
      .addCase(getCoinDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        if (process.env.NODE_ENV === "development") {
          console.log("Redux: Processing getCoinDetail.pending");
        }
      })
      .addCase(getCoinDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCoin = action.payload;
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Redux: Processing getCoinDetail.fulfilled, coin:",
            action.payload?.id
          );
        }
      })
      .addCase(getCoinDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coin details";
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Redux: Processing getCoinDetail.rejected, error:",
            state.error
          );
        }
      })

      // Historical data
      .addCase(getHistoricalData.pending, (state) => {
        state.loading = true;
        state.error = null;
        if (process.env.NODE_ENV === "development") {
          console.log("Redux: Processing getHistoricalData.pending");
        }
      })
      .addCase(
        getHistoricalData.fulfilled,
        (state, action: PayloadAction<any & { coinId: string }>) => {
          state.loading = false;

          if (!state.chartData) {
            state.chartData = {
              labels: action.payload.labels,
              prices: action.payload.prices,
              compareData: [],
            };
          } else if (action.payload.coinId === state.selectedCoin?.id) {
            state.chartData.labels = action.payload.labels;
            state.chartData.prices = action.payload.prices;
          } else {
            state.chartData.compareData = [
              ...(state.chartData.compareData || []),
              ...action.payload.prices,
            ];
          }

          if (process.env.NODE_ENV === "development") {
            console.log(
              "Redux: Processing getHistoricalData.fulfilled, data points:",
              action.payload.prices?.length
            );
          }
        }
      )
      .addCase(getHistoricalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch historical data";
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Redux: Processing getHistoricalData.rejected, error:",
            state.error
          );
        }
      });
  },
});

export default cryptoSlice.reducer;
