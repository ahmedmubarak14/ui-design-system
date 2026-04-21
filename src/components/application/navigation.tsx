"use client";

import * as React from "react";
import { ChevronRight, ChevronLeft, MoreHorizontal, Check, Home } from "lucide-react";
import { cn } from "@/lib/utils";

/* === TABS === */
export interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; count?: number; disabled?: boolean }[];
  value: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pill" | "segmented";
  size?: "sm" | "md";
  className?: string;
}

export function Tabs({ tabs, value, onChange, variant = "underline", size = "md", className }: TabsProps) {
  if (variant === "segmented") {
    return (
      <div
        className={cn(
          "inline-flex p-1 bg-gray-100 rounded-lg",
          className
        )}
        role="tablist"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={value === t.id}
            disabled={t.disabled}
            onClick={() => onChange(t.id)}
            className={cn(
              "inline-flex items-center gap-2 font-medium rounded-md transition disabled:opacity-50",
              size === "sm" ? "h-8 px-3 text-sm" : "h-9 px-3.5 text-sm",
              value === t.id
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div className={cn("inline-flex gap-2", className)} role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={value === t.id}
            disabled={t.disabled}
            onClick={() => onChange(t.id)}
            className={cn(
              "inline-flex items-center gap-2 font-medium rounded-full transition disabled:opacity-50",
              size === "sm" ? "h-8 px-3 text-sm" : "h-9 px-4 text-sm",
              value === t.id
                ? "bg-brand-50 text-brand-700"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && (
              <span className={cn(
                "ml-0.5 px-1.5 py-0.5 text-xs font-medium rounded-full",
                value === t.id ? "bg-brand-100 text-brand-700" : "bg-gray-100 text-gray-600"
              )}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("border-b border-gray-200", className)}>
      <div className="flex gap-1" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={value === t.id}
            disabled={t.disabled}
            onClick={() => onChange(t.id)}
            className={cn(
              "inline-flex items-center gap-2 font-medium border-b-2 -mb-px transition disabled:opacity-50",
              size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-sm",
              value === t.id
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && (
              <span className={cn(
                "ml-0.5 px-1.5 py-0.5 text-xs font-medium rounded-full",
                value === t.id ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-600"
              )}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* === BREADCRUMBS === */
export interface BreadcrumbsProps {
  items: { label: string; href?: string; icon?: React.ReactNode }[];
  separator?: React.ReactNode;
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, separator, showHome, className }: BreadcrumbsProps) {
  const all = showHome
    ? [{ label: "", href: "/", icon: <Home className="size-4" /> }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center gap-2 flex-wrap">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition"
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <span className={cn(
                  "inline-flex items-center gap-1.5",
                  isLast ? "text-gray-900 font-medium" : "text-gray-500"
                )}>
                  {item.icon}
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="text-gray-300">
                  {separator ?? <ChevronRight className="size-4" />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* === PAGINATION === */
export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className,
}: PaginationProps) {
  const getPages = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  };

  return (
    <nav className={cn("flex items-center justify-between gap-3 pt-4 border-t border-gray-200", className)}>
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex items-center gap-1.5 h-9 px-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft className="size-4" />
        Previous
      </button>

      {showPageNumbers && (
        <div className="flex items-center gap-1">
          {getPages().map((p, i) =>
            p === "ellipsis" ? (
              <span key={`e${i}`} className="size-9 inline-flex items-center justify-center text-gray-500">
                <MoreHorizontal className="size-4" />
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={cn(
                  "size-9 inline-flex items-center justify-center text-sm font-medium rounded-lg transition",
                  page === p
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {p}
              </button>
            )
          )}
        </div>
      )}

      {!showPageNumbers && (
        <span className="text-sm text-gray-700">
          Page <span className="font-semibold">{page}</span> of {totalPages}
        </span>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="inline-flex items-center gap-1.5 h-9 px-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

/* === STEPPER === */
export interface StepperProps {
  steps: { title: string; description?: string }[];
  current: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({ steps, current, orientation = "horizontal", className }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <ol className={cn("flex flex-col", className)}>
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "size-8 rounded-full inline-flex items-center justify-center text-sm font-semibold border-2 transition",
                    isCompleted && "bg-brand-600 border-brand-600 text-white",
                    isCurrent && "bg-brand-50 border-brand-600 text-brand-700 ring-4 ring-brand-100",
                    !isCompleted && !isCurrent && "bg-white border-gray-300 text-gray-500"
                  )}
                >
                  {isCompleted ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                </span>
                {!isLast && (
                  <span
                    className={cn(
                      "w-0.5 flex-1 my-1",
                      isCompleted ? "bg-brand-600" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
              <div className={cn("pb-8", isLast && "pb-0")}>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isCurrent || isCompleted ? "text-gray-900" : "text-gray-500"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-sm text-gray-500">{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cn("flex items-center w-full", className)}>
      {steps.map((step, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current;
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex flex-col items-center text-center">
              <span
                className={cn(
                  "size-9 rounded-full inline-flex items-center justify-center text-sm font-semibold border-2 transition",
                  isCompleted && "bg-brand-600 border-brand-600 text-white",
                  isCurrent && "bg-brand-50 border-brand-600 text-brand-700 ring-4 ring-brand-100",
                  !isCompleted && !isCurrent && "bg-white border-gray-300 text-gray-500"
                )}
              >
                {isCompleted ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </span>
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  isCurrent || isCompleted ? "text-gray-900" : "text-gray-500"
                )}
              >
                {step.title}
              </p>
            </div>
            {!isLast && (
              <span
                className={cn(
                  "h-0.5 flex-1 mx-2 -mt-7",
                  isCompleted ? "bg-brand-600" : "bg-gray-200"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
