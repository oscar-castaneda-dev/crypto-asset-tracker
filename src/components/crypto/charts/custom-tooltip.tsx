import { formatPrice } from "@/lib/priceUtils";

export function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-md">
        <p className="text-sm font-medium mb-1">Date: {label}</p>
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="flex justify-between items-center text-sm py-1"
          >
            <span style={{ color: entry.stroke }}>
              {entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}:
            </span>
            <span className="font-medium ml-2">{formatPrice(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
