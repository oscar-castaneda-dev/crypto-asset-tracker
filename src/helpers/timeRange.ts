import { TimeRange } from "@/types/crypto";

export const timeRangeToDays = (range: TimeRange): number => {
  switch (range) {
    case "1d":
      return 1;
    case "7d":
      return 7;
    case "14d":
      return 14;
    case "30d":
      return 30;
    case "90d":
      return 90;
    case "1y":
      return 365;
    default:
      return 7;
  }
};
