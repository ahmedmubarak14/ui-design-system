"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* === CARD === */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  noPadding?: boolean;
}

export function Card({ className, hoverable, noPadding, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-2xl shadow-xs",
        !noPadding && "p-6",
        hoverable && "transition-shadow hover:shadow-md cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-start justify-between gap-4 mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-gray-900", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500 mt-1", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3", className)}
      {...props}
    />
  );
}

/* === METRIC CARD === */
export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  chart?: React.ReactNode;
}

export function MetricCard({
  className,
  label,
  value,
  change,
  changeLabel = "vs last period",
  icon,
  chart,
  ...props
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn("bg-white border border-gray-200 rounded-2xl shadow-xs p-6", className)} {...props}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {icon && <div className="text-gray-400 [&>svg]:size-5">{icon}</div>}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight tabular-nums">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-medium",
                  isPositive ? "bg-success-50 text-success-700" : "bg-error-50 text-error-700"
                )}
              >
                {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {Math.abs(change)}%
              </span>
              <span className="text-gray-500">{changeLabel}</span>
            </div>
          )}
        </div>
        {chart && <div className="shrink-0">{chart}</div>}
      </div>
    </div>
  );
}

/* === STAT GRID === */
export interface StatProps {
  label: string;
  value: string | number;
  description?: string;
}

export function StatGrid({ stats, className }: { stats: StatProps[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden", className)}>
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-6">
          <p className="text-sm text-gray-500">{s.label}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 tracking-tight">{s.value}</p>
          {s.description && <p className="mt-1 text-sm text-gray-500">{s.description}</p>}
        </div>
      ))}
    </div>
  );
}
