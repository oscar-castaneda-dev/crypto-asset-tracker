import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchHistoricalData } from "@/services/historicalService";
import { fetchTopCoins, fetchCoinDetail } from "@/services/coinService";
import type { Coin, TimeRange } from "@/types/crypto";

// Get Top Coins
export const getTopCoins = createAsyncThunk<
  Coin[],
  number,
  { rejectValue: string }
>("crypto/getTopCoins", async (limit = 10, { rejectWithValue }) => {
  try {
    const response = await fetchTopCoins(limit);
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Redux Thunk: Error fetching top coins:", error);
    }
    return rejectWithValue("Failed to fetch top coins");
  }
});

// Get Coin Detail
export const getCoinDetail = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("crypto/getCoinDetail", async (coinId, { rejectWithValue }) => {
  try {
    const response = await fetchCoinDetail(coinId);
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Redux Thunk: Error fetching coin detail:", error);
    }
    return rejectWithValue("Failed to fetch coin details");
  }
});

export const getHistoricalData = createAsyncThunk<
  any,
  { coinId: string; range: TimeRange },
  { rejectValue: string }
>(
  "crypto/getHistoricalData",
  async ({ coinId, range }, { rejectWithValue }) => {
    try {
      const response = await fetchHistoricalData(coinId, range);
      return { ...response, coinId };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Redux Thunk: Error fetching historical data:", error);
      }
      return rejectWithValue("Failed to fetch historical data");
    }
  }
);
