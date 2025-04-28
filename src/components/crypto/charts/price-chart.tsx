import { useState, useEffect } from "react";
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

interface PriceChartProps {
  coinId: string;
  compareCoinId?: string;
}

export function PriceChart({ coinId, compareCoinId }: PriceChartProps) {
  const dispatch = useAppDispatch();
  const { chartData } = useAppSelector((state) => state.crypto);

  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [localChartData, setLocalChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      if (!coinId) return;

      setLoading(true);

      try {
        // Pedimos data
        await dispatch(getHistoricalData({ coinId, range: timeRange }));
        if (compareCoinId) {
          await dispatch(
            getHistoricalData({ coinId: compareCoinId, range: timeRange })
          );
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        // Pequeño delay para transición suave
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    loadChartData();
  }, [dispatch, coinId, compareCoinId, timeRange]);

  useEffect(() => {
    if (!chartData?.labels || !chartData?.prices) return;

    const formatted = chartData.labels.map((date, index) => ({
      date,
      [coinId]: chartData.prices[index] || 0,
      ...(compareCoinId && chartData.compareData
        ? { [compareCoinId]: chartData.compareData[index] || 0 }
        : {}),
    }));

    setLocalChartData(formatted);
  }, [chartData, coinId, compareCoinId]);

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
