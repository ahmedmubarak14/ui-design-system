"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* === SELECT (native) === */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full h-10 pl-3 pr-9 text-base text-gray-900 bg-white border rounded-lg shadow-xs appearance-none cursor-pointer outline-none transition-shadow",
            "focus:ring-4 focus:ring-brand-100 focus:border-brand-300",
            invalid
              ? "border-error-300 focus:ring-error-100 focus:border-error-300"
              : "border-gray-300",
            props.disabled && "bg-gray-50 cursor-not-allowed opacity-70",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
      </div>
    );
  }
);
Select.displayName = "Select";

/* === SLIDER === */
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValue?: boolean;
}

export function Slider({ className, showValue, value, ...props }: SliderProps) {
  const [v, setV] = React.useState(value ?? props.defaultValue ?? 50);
  const min = Number(props.min ?? 0);
  const max = Number(props.max ?? 100);
  const pct = ((Number(v) - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 h-5 flex items-center">
        <div className="absolute inset-x-0 h-2 bg-gray-200 rounded-full" />
        <div
          className="absolute h-2 bg-brand-600 rounded-full pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          value={v}
          onChange={(e) => {
            setV(e.target.value);
            props.onChange?.(e);
          }}
          className={cn(
            "relative w-full appearance-none bg-transparent cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:ring-4 [&::-webkit-slider-thumb]:hover:ring-brand-100",
            "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand-600 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab",
            className
          )}
          {...props}
        />
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 tabular-nums w-10 text-right">{v}</span>
      )}
    </div>
  );
}

/* === PROGRESS BAR === */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  color?: "brand" | "success" | "warning" | "error";
}

export function ProgressBar({
  className,
  value,
  max = 100,
  size = "md",
  showLabel,
  color = "brand",
  ...props
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className={cn("flex items-center gap-3", showLabel && "mb-1")}>
        <div className={cn("flex-1 bg-gray-200 rounded-full overflow-hidden", heightClass)}>
          <div
            className={cn("h-full rounded-full transition-all duration-500", {
              "bg-brand-600": color === "brand",
              "bg-success-600": color === "success",
              "bg-warning-500": color === "warning",
              "bg-error-600": color === "error",
            })}
            style={{ width: `${pct}%` }}
          />
        </div>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 tabular-nums">
            {Math.round(pct)}%
          </span>
        )}
      </div>
    </div>
  );
}

/* === PROGRESS RING === */
export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: "brand" | "success" | "warning" | "error";
}

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  strokeWidth = 6,
  showLabel = true,
  color = "brand",
}: ProgressRingProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const strokeColor = {
    brand: "#7f56d9",
    success: "#039855",
    warning: "#f79009",
    error: "#d92d20",
  }[color];

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-gray-200)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-semibold text-gray-700 tabular-nums">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}

/* === TOOLTIP (CSS-only) === */
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, side = "top", children, className, ...props }: TooltipProps) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span className={cn("relative inline-flex group", className)} {...props}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity",
          positions[side]
        )}
      >
        {content}
      </span>
    </span>
  );
}

/* === FEATURED ICON === */
const featuredIconVariants = cva(
  "inline-flex items-center justify-center shrink-0",
  {
    variants: {
      color: {
        gray: "bg-gray-100 text-gray-700",
        brand: "bg-brand-100 text-brand-600",
        success: "bg-success-100 text-success-600",
        warning: "bg-warning-100 text-warning-600",
        error: "bg-error-100 text-error-600",
      },
      size: {
        sm: "size-8 rounded-lg [&>svg]:size-4",
        md: "size-10 rounded-lg [&>svg]:size-5",
        lg: "size-12 rounded-xl [&>svg]:size-6",
        xl: "size-14 rounded-xl [&>svg]:size-7",
      },
      variant: {
        light: "",
        outline: "ring-8",
        modern: "border shadow-xs",
      },
    },
    compoundVariants: [
      { color: "gray", variant: "outline", className: "ring-gray-50" },
      { color: "brand", variant: "outline", className: "ring-brand-50" },
      { color: "success", variant: "outline", className: "ring-success-50" },
      { color: "warning", variant: "outline", className: "ring-warning-50" },
      { color: "error", variant: "outline", className: "ring-error-50" },
      { color: "gray", variant: "modern", className: "bg-white border-gray-200" },
      { color: "brand", variant: "modern", className: "bg-white border-gray-200" },
    ],
    defaultVariants: { color: "brand", size: "md", variant: "light" },
  }
);

export interface FeaturedIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof featuredIconVariants> {}

export function FeaturedIcon({ className, color, size, variant, ...props }: FeaturedIconProps) {
  return (
    <span className={cn(featuredIconVariants({ color, size, variant }), className)} {...props} />
  );
}

/* === SPINNER / LOADING === */
export function Spinner({
  size = "md",
  className,
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    xs: "size-3 border-[1.5px]",
    sm: "size-4 border-2",
    md: "size-6 border-2",
    lg: "size-8 border-[3px]",
    xl: "size-12 border-4",
  };
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block rounded-full border-current border-t-transparent animate-spin",
        sizes[size],
        className
      )}
    />
  );
}

/* === RATING STARS === */
export function RatingStars({
  value,
  max = 5,
  size = 16,
  className,
}: {
  value: number;
  max?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id={`star-${i}-${value}`}>
                <stop offset={`${fill * 100}%`} stopColor="#fdb022" />
                <stop offset={`${fill * 100}%`} stopColor="var(--color-gray-200)" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.667l2.575 5.217 5.758.836-4.167 4.062.984 5.735L10 14.825l-5.15 2.692.983-5.735L1.667 7.72l5.758-.836L10 1.667z"
              fill={`url(#star-${i}-${value})`}
              stroke="var(--color-gray-300)"
              strokeWidth="0.5"
            />
          </svg>
        );
      })}
    </div>
  );
}
