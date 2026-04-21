"use client";

import * as React from "react";
import {
  AreaChart as RAreaChart,
  Area,
  BarChart as RBarChart,
  Bar,
  LineChart as RLineChart,
  Line,
  PieChart as RPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export const CHART_COLORS = ["#7f56d9", "#039855", "#f79009", "#d92d20", "#3b82f6", "#06b6d4"];

const tooltipStyle = {
  background: "white",
  border: "1px solid var(--color-gray-200)",
  borderRadius: "0.75rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  boxShadow: "0 12px 16px -4px rgb(16 24 40 / 0.08)",
};

const labelStyle = { color: "var(--color-gray-900)", fontWeight: 600, marginBottom: "0.25rem" };

export interface ChartDataPoint {
  [key: string]: any;
}

export interface AreaChartProps {
  data: ChartDataPoint[];
  xKey: string;
  series: { key: string; color?: string; label?: string }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function AreaChart({ data, xKey, series, height = 280, showGrid = true, showLegend }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RAreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color || CHART_COLORS[i]} stopOpacity={0.25} />
              <stop offset="100%" stopColor={s.color || CHART_COLORS[i]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-100)" vertical={false} />}
        <XAxis dataKey={xKey} tick={{ fill: "var(--color-gray-500)", fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "var(--color-gray-500)", fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
        {showLegend && <Legend wrapperStyle={{ fontSize: 13 }} />}
        {series.map((s, i) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label || s.key}
            stroke={s.color || CHART_COLORS[i]}
            strokeWidth={2}
            fill={`url(#grad-${s.key})`}
          />
        ))}
      </RAreaChart>
    </ResponsiveContainer>
  );
}

export interface BarChartProps {
  data: ChartDataPoint[];
  xKey: string;
  series: { key: string; color?: string; label?: string }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  stacked?: boolean;
}

export function BarChart({ data, xKey, series, height = 280, showGrid = true, showLegend, stacked }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RBarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-100)" vertical={false} />}
        <XAxis dataKey={xKey} tick={{ fill: "var(--color-gray-500)", fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "var(--color-gray-500)", fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} cursor={{ fill: "var(--color-gray-50)" }} />
        {showLegend && <Legend wrapperStyle={{ fontSize: 13 }} />}
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label || s.key}
            fill={s.color || CHART_COLORS[i]}
            stackId={stacked ? "stack" : undefined}
            radius={stacked ? 0 : [4, 4, 0, 0]}
          />
        ))}
      </RBarChart>
    </ResponsiveContainer>
  );
}

export interface LineChartProps {
  data: ChartDataPoint[];
  xKey: string;
  series: { key: string; color?: string; label?: string }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function LineChart({ data, xKey, series, height = 280, showGrid = true, showLegend }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RLineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-100)" vertical={false} />}
        <XAxis dataKey={xKey} tick={{ fill: "var(--color-gray-500)", fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "var(--color-gray-500)", fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
        {showLegend && <Legend wrapperStyle={{ fontSize: 13 }} />}
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label || s.key}
            stroke={s.color || CHART_COLORS[i]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </RLineChart>
    </ResponsiveContainer>
  );
}

export interface DonutChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  innerRadius?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({ data, height = 280, innerRadius = 60, centerLabel, centerValue }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={innerRadius + 35}
            dataKey="value"
            stroke="white"
            strokeWidth={2}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color || CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
        </RPieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && (
            <p className="text-2xl font-semibold text-gray-900 tabular-nums">{centerValue || total}</p>
          )}
          {centerLabel && <p className="text-xs text-gray-500 mt-0.5">{centerLabel}</p>}
        </div>
      )}
    </div>
  );
}

export function ChartLegend({
  items,
  className,
}: {
  items: { label: string; value?: string; color: string }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className || ""}`}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: item.color }} />
          <span className="text-sm text-gray-600">{item.label}</span>
          {item.value && <span className="text-sm font-semibold text-gray-900">{item.value}</span>}
        </div>
      ))}
    </div>
  );
}
