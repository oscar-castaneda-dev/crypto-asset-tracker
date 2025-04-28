import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "./chart-skeleton";
import { CustomTooltip } from "./custom-tooltip";
import { getHistoricalData } from "@/store/crypto/cryptoThunks";
import { getLineColor } from "@/lib/priceUtils";
import { TimeRange } from "@/types/crypto";
import { TimeRangeSelector } from "@/components/crypto/selectors/time-range-selector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

interface FormattedChartData {
  date: string;
  [coinId: string]: string | number;
}

interface PriceChartProps {
  coinId: string;
  compareCoinId?: string;
}

export function PriceChart({ coinId, compareCoinId }: PriceChartProps) {
  const dispatch = useAppDispatch();
  const { historicalData } = useAppSelector((state) => state.crypto);

  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [loading, setLoading] = useState(true);
  const [localChartData, setLocalChartData] = useState<FormattedChartData[]>(
    []
  );

  useEffect(() => {
    const loadData = async () => {
      if (!coinId) return;

      setLoading(true);

      try {
        await dispatch(getHistoricalData({ coinId, range: timeRange }));
        if (compareCoinId) {
          await dispatch(
            getHistoricalData({ coinId: compareCoinId, range: timeRange })
          );
        }
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };

    loadData();
  }, [dispatch, coinId, compareCoinId, timeRange]);

  useEffect(() => {
    if (!historicalData[coinId]?.labels || !historicalData[coinId]?.prices)
      return;

    const mainCoin = historicalData[coinId];
    const compareCoin = compareCoinId ? historicalData[compareCoinId] : null;

    const formattedData: FormattedChartData[] = mainCoin.labels.map(
      (date: string, index: number) => {
        const entry: FormattedChartData = {
          date,
          [coinId]: mainCoin.prices[index],
        };

        if (
          compareCoinId &&
          compareCoin &&
          compareCoin.prices[index] !== undefined
        ) {
          entry[compareCoinId] = compareCoin.prices[index];
        }

        return entry;
      }
    );

    setLocalChartData(formattedData);
  }, [historicalData, coinId, compareCoinId]);

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Price History</CardTitle>
        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={handleTimeRangeChange}
        />
      </CardHeader>

      <CardContent className="pt-6">
        {loading ? (
          <ChartSkeleton />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={localChartData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={coinId}
                stroke={getLineColor(coinId)}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                name={coinId.charAt(0).toUpperCase() + coinId.slice(1)}
              />
              {compareCoinId && (
                <Line
                  type="monotone"
                  dataKey={compareCoinId}
                  stroke={getLineColor(compareCoinId)}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  name={
                    compareCoinId.charAt(0).toUpperCase() +
                    compareCoinId.slice(1)
                  }
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
