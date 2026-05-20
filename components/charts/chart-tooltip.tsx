import * as React from 'react';

function formatValue(value: number, prefix?: string, suffix?: string) {
  const formatted =
    value >= 1000
      ? value.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : String(value);
  return `${prefix ?? ''}${formatted}${suffix ?? ''}`;
}

interface PayloadEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: number;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: PayloadEntry[];
  label?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  labelFormatter?: (label: string) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  valuePrefix,
  valueSuffix,
  labelFormatter,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md text-sm">
      <p className="mb-1.5 font-medium text-foreground">
        {labelFormatter ? labelFormatter(label ?? '') : label}
      </p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">
            {String(entry.name ?? '').replace(/_/g, ' ')}:
          </span>
          <span className="font-medium text-foreground">
            {formatValue(entry.value ?? 0, valuePrefix, valueSuffix)}
          </span>
        </div>
      ))}
    </div>
  );
}
