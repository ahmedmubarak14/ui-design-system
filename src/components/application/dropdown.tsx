"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* === DROPDOWN MENU === */
export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
}

export function Dropdown({ trigger, items, align = "start", className }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen((s) => !s)}>{trigger}</div>
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute top-full mt-2 min-w-[220px] py-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in-up",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          {items.map((item, i) =>
            item.separator ? (
              <div key={`sep-${i}`} className="my-1.5 h-px bg-gray-100" />
            ) : (
              <button
                key={item.id}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition disabled:opacity-50 disabled:cursor-not-allowed",
                  item.destructive
                    ? "text-error-600 hover:bg-error-50"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {item.icon && (
                  <span className={cn(
                    "shrink-0 [&>svg]:size-4",
                    item.destructive ? "text-error-500" : "text-gray-500"
                  )}>
                    {item.icon}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <kbd className="text-xs text-gray-400 font-mono">{item.shortcut}</kbd>
                )}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* === COMBOBOX / SEARCHABLE SELECT === */
export interface ComboboxOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={cn(
          "w-full h-10 px-3 flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg shadow-xs text-sm text-left transition-shadow",
          "hover:border-gray-400 focus:ring-4 focus:ring-brand-100 focus:border-brand-300 outline-none"
        )}
      >
        <span className={cn("truncate", !selected && "text-gray-500")}>
          {selected?.label || placeholder}
        </span>
        <svg className="size-4 text-gray-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-9 px-2.5 text-sm bg-gray-50 border border-gray-200 rounded-md outline-none focus:bg-white focus:border-brand-300"
            />
          </div>
          <div className="max-h-60 overflow-y-auto py-1.5">
            {filtered.length === 0 ? (
              <p className="px-3 py-6 text-sm text-center text-gray-500">{emptyText}</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition"
                >
                  {opt.icon && <span className="shrink-0 [&>svg]:size-4 text-gray-500">{opt.icon}</span>}
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{opt.label}</p>
                    {opt.description && (
                      <p className="text-xs text-gray-500 truncate">{opt.description}</p>
                    )}
                  </div>
                  {value === opt.value && <Check className="size-4 text-brand-600 shrink-0" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* === COMMAND MENU (cmd+k style) === */
export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  group?: string;
  shortcut?: string;
  onSelect?: () => void;
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}

export function CommandMenu({ open, onClose, items, placeholder = "Type a command or search..." }: CommandMenuProps) {
  const [search, setSearch] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const key = item.group || "Suggestions";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] animate-fade-in-up">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-gray-100">
          <svg className="size-5 text-gray-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
          </svg>
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="flex-1 h-14 text-base text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
          />
          <kbd className="text-xs text-gray-400 font-mono px-1.5 py-0.5 border border-gray-200 rounded">esc</kbd>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-12 text-sm text-center text-gray-500">No results found</p>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="mb-2">
                <p className="px-3 pt-2 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {group}
                </p>
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.onSelect?.();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    {item.icon && <span className="shrink-0 [&>svg]:size-4 text-gray-500">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="text-xs text-gray-400 font-mono">{item.shortcut}</kbd>
                    )}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
