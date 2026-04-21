"use client";

import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/base/forms";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  selectable?: boolean;
  selected?: Set<string | number>;
  onSelectChange?: (selected: Set<string | number>) => void;
  rowKey?: keyof T;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (key: string) => void;
  empty?: React.ReactNode;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  selectable,
  selected,
  onSelectChange,
  rowKey = "id" as keyof T,
  sortKey,
  sortDirection,
  onSort,
  empty,
  className,
}: TableProps<T>) {
  const allSelected = selected && data.length > 0 && data.every((r) => selected.has(r[rowKey]));
  const someSelected = selected && data.some((r) => selected.has(r[rowKey])) && !allSelected;

  const toggleAll = () => {
    if (!onSelectChange) return;
    if (allSelected) onSelectChange(new Set());
    else onSelectChange(new Set(data.map((r) => r[rowKey])));
  };

  const toggleRow = (key: string | number) => {
    if (!onSelectChange || !selected) return;
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onSelectChange(next);
  };

  return (
    <div className={cn("w-full overflow-hidden border border-gray-200 rounded-xl shadow-xs bg-white", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {selectable && (
                <th className="w-12 px-6 py-3 text-left">
                  <Checkbox
                    checked={!!allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={String(col.key) + i}
                  style={{ width: col.width }}
                  className={cn(
                    "px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    !col.align && "text-left"
                  )}
                >
                  {col.sortable && onSort ? (
                    <button
                      onClick={() => onSort(String(col.key))}
                      className="inline-flex items-center gap-1.5 hover:text-gray-900 transition"
                    >
                      {col.header}
                      {sortKey === col.key ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="size-3.5" />
                        ) : (
                          <ArrowDown className="size-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="size-3.5 opacity-50" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-16 text-center text-gray-500">
                  {empty || "No data"}
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const key = row[rowKey];
                const isSelected = selected?.has(key);
                return (
                  <tr
                    key={key}
                    className={cn(
                      "transition-colors hover:bg-gray-50",
                      isSelected && "bg-brand-25"
                    )}
                  >
                    {selectable && (
                      <td className="w-12 px-6 py-4">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                        />
                      </td>
                    )}
                    {columns.map((col, i) => (
                      <td
                        key={String(col.key) + i}
                        className={cn(
                          "px-6 py-4 text-sm text-gray-700",
                          col.align === "right" && "text-right",
                          col.align === "center" && "text-center"
                        )}
                      >
                        {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* === SIMPLE TABLE PRIMITIVES (for hand-rolled layouts) === */
export function THead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-gray-50 border-b border-gray-200", className)} {...props} />;
}

export function TH({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
}

export function TD({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-6 py-4 text-sm text-gray-700", className)} {...props} />;
}

export function TR({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("hover:bg-gray-50 transition", className)} {...props} />;
}
