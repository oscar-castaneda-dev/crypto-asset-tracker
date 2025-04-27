import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchHistoricalData } from "@/services/historicalService";
import { fetchTopCoins, fetchCoinDetail } from "@/services/coinService";
import type { TimeRange } from "@/types/crypto";

export const getTopCoins = createAsyncThunk(
  "crypto/getTopCoins",
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("Redux Thunk: Fetching top coins, limit:", limit);
      }
      const response = await fetchTopCoins(limit);
      return response;
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") {
        console.error("Redux Thunk: Error fetching top coins:", error);
      }
      return rejectWithValue("Failed to fetch top coins");
    }
  }
);

export const getCoinDetail = createAsyncThunk(
  "crypto/getCoinDetail",
  async (coinId: string, { rejectWithValue }) => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("Redux Thunk: Fetching coin detail for:", coinId);
      }
      const response = await fetchCoinDetail(coinId);
      return response;
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") {
        console.error("Redux Thunk: Error fetching coin detail:", error);
      }
      return rejectWithValue("Failed to fetch coin details");
    }
  }
);

export const getHistoricalData = createAsyncThunk(
  "crypto/getHistoricalData",
  async (
    { coinId, range }: { coinId: string; range: TimeRange },
    { rejectWithValue }
  ) => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "Redux Thunk: Fetching historical data for:",
          coinId,
          "range:",
          range
        );
      }
      const response = await fetchHistoricalData(coinId, range);
      return { ...response, coinId };
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") {
        console.error("Redux Thunk: Error fetching historical data:", error);
      }
      return rejectWithValue("Failed to fetch historical data");
    }
  }
);
