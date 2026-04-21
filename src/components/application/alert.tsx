"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

export function Alert({
  className,
  variant = "info",
  title,
  description,
  actions,
  onClose,
  icon,
  children,
  ...props
}: AlertProps) {
  const Icon = iconMap[variant];

  const palette = {
    info: { bg: "bg-brand-25 border-brand-200", icon: "text-brand-600", title: "text-brand-900", text: "text-brand-700" },
    success: { bg: "bg-success-25 border-success-200", icon: "text-success-600", title: "text-success-900", text: "text-success-700" },
    warning: { bg: "bg-warning-25 border-warning-200", icon: "text-warning-600", title: "text-warning-900", text: "text-warning-700" },
    error: { bg: "bg-error-25 border-error-200", icon: "text-error-600", title: "text-error-900", text: "text-error-700" },
  }[variant];

  return (
    <div
      role="alert"
      className={cn("flex items-start gap-3 p-4 rounded-xl border", palette.bg, className)}
      {...props}
    >
      <span className={cn("shrink-0 mt-0.5", palette.icon)}>{icon ?? <Icon className="size-5" />}</span>
      <div className="flex-1 min-w-0">
        {title && <p className={cn("text-sm font-semibold", palette.title)}>{title}</p>}
        {description && (
          <p className={cn("text-sm", title && "mt-1", palette.text)}>{description}</p>
        )}
        {children}
        {actions && <div className="flex items-center gap-3 mt-3">{actions}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn("shrink-0 -m-1 p-1 rounded hover:bg-black/5 transition", palette.icon)}
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "neutral" | "brand" | "success" | "warning" | "error";
  onClose?: () => void;
}

export function Banner({ className, variant = "neutral", onClose, children, ...props }: BannerProps) {
  const palette = {
    neutral: "bg-gray-900 text-white",
    brand: "bg-brand-600 text-white",
    success: "bg-success-600 text-white",
    warning: "bg-warning-500 text-white",
    error: "bg-error-600 text-white",
  }[variant];

  return (
    <div
      className={cn(
        "relative w-full px-4 py-3 flex items-center justify-center gap-3 text-sm",
        palette,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 max-w-7xl mx-auto">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, actions, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-6", className)}>
      {icon && (
        <div className="size-14 rounded-full bg-gray-100 flex items-center justify-center mb-4 [&>svg]:size-7 text-gray-600">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-gray-500 max-w-md">{description}</p>
      )}
      {actions && <div className="mt-6 flex items-center gap-3">{actions}</div>}
    </div>
  );
}
