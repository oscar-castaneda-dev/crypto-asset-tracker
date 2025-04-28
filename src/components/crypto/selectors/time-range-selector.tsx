import { TimeRange } from "@/types/crypto";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: "1d", label: "1D" },
  { value: "7d", label: "7D" },
  { value: "14d", label: "14D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "1y", label: "1Y" },
];

export function TimeRangeSelector({
  selectedRange,
  onRangeChange,
}: TimeRangeSelectorProps) {
  const handleChange = (value: string) => {
    if (value) {
      onRangeChange(value as TimeRange);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={selectedRange}
      onValueChange={handleChange}
    >
      {timeRanges.map(({ value, label }) => (
        <ToggleGroupItem key={value} value={value} className="px-3 py-1">
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
