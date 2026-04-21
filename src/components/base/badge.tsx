"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium border",
  {
    variants: {
      color: {
        gray: "bg-gray-50 text-gray-700 border-gray-200",
        brand: "bg-brand-50 text-brand-700 border-brand-200",
        success: "bg-success-50 text-success-700 border-success-200",
        warning: "bg-warning-50 text-warning-700 border-warning-200",
        error: "bg-error-50 text-error-700 border-error-200",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-full",
        md: "px-2.5 py-0.5 text-sm rounded-full",
        lg: "px-3 py-1 text-sm rounded-full",
      },
      variant: {
        soft: "",
        solid: "",
        outline: "bg-transparent",
      },
    },
    compoundVariants: [
      { color: "gray", variant: "solid", className: "bg-gray-700 text-white border-transparent" },
      { color: "brand", variant: "solid", className: "bg-brand-600 text-white border-transparent" },
      { color: "success", variant: "solid", className: "bg-success-600 text-white border-transparent" },
      { color: "warning", variant: "solid", className: "bg-warning-600 text-white border-transparent" },
      { color: "error", variant: "solid", className: "bg-error-600 text-white border-transparent" },
    ],
    defaultVariants: {
      color: "gray",
      size: "md",
      variant: "soft",
    },
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  onRemove?: () => void;
}

export function Badge({
  className,
  color,
  size,
  variant,
  dot,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ color, size, variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("size-1.5 rounded-full", {
            "bg-gray-500": color === "gray" || !color,
            "bg-brand-500": color === "brand",
            "bg-success-500": color === "success",
            "bg-warning-500": color === "warning",
            "bg-error-500": color === "error",
          })}
        />
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 -mr-0.5 hover:opacity-70 transition"
          aria-label="Remove"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}

export interface BadgeGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  leadingText?: string;
  trailingIcon?: React.ReactNode;
  color?: VariantProps<typeof badgeVariants>["color"];
}

export function BadgeGroup({
  className,
  leadingText,
  trailingIcon,
  color = "brand",
  children,
  ...props
}: BadgeGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border bg-white shadow-xs",
        className
      )}
      {...props}
    >
      <Badge color={color} size="sm" variant="soft">
        {leadingText}
      </Badge>
      <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
        {children}
        {trailingIcon}
      </span>
    </div>
  );
}

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  avatar?: React.ReactNode;
}

export function Tag({ className, onRemove, avatar, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 pl-2 pr-1.5 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-xs",
        avatar && "pl-1",
        className
      )}
      {...props}
    >
      {avatar}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Remove"
        >
          <X className="size-3.5" />
        </button>
      )}
    </span>
  );
}
