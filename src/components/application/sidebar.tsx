"use client";

import * as React from "react";
import { ChevronDown, Menu, X, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/base/avatar";

/* === SIDEBAR === */
export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sidebar({ items, activeId, onItemClick, logo, footer, className }: SidebarProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderItem = (item: SidebarItem, depth = 0) => {
    const isActive = activeId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded.has(item.id);

    return (
      <li key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) toggle(item.id);
            else onItemClick?.(item.id);
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition group",
            depth > 0 && "ml-4",
            isActive
              ? "bg-brand-50 text-brand-700"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {item.icon && (
            <span className={cn(
              "shrink-0 [&>svg]:size-5",
              isActive ? "text-brand-600" : "text-gray-500"
            )}>
              {item.icon}
            </span>
          )}
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span className={cn(
              "px-1.5 py-0.5 text-xs font-medium rounded-full",
              isActive ? "bg-brand-100 text-brand-700" : "bg-gray-100 text-gray-600"
            )}>
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                "size-4 text-gray-400 transition-transform shrink-0",
                isExpanded && "rotate-180"
              )}
            />
          )}
        </button>
        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-0.5">
            {item.children!.map((c) => renderItem(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className={cn("flex flex-col h-full w-64 bg-white border-r border-gray-200", className)}>
      {logo && <div className="h-16 px-6 flex items-center border-b border-gray-200">{logo}</div>}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-0.5">{items.map((item) => renderItem(item))}</ul>
      </nav>
      {footer && <div className="p-3 border-t border-gray-200">{footer}</div>}
    </aside>
  );
}

/* === TOP NAV / HEADER === */
export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: { label: string; href: string; active?: boolean }[];
  actions?: React.ReactNode;
  showSearch?: boolean;
  user?: { name: string; email?: string; avatar?: string };
}

export function TopNav({
  className,
  logo,
  links,
  actions,
  showSearch,
  user,
  ...props
}: TopNavProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      className={cn("sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200", className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          {logo}
          {links && (
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition",
                    link.active
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {showSearch && (
          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full h-9 pl-9 pr-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-brand-300 focus:ring-4 focus:ring-brand-100 transition"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {actions}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Bell className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 bg-error-500 rounded-full ring-2 ring-white" />
              </button>
              <Avatar
                size="sm"
                src={user.avatar}
                initials={user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
              />
            </div>
          )}
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && links && (
        <nav className="md:hidden border-t border-gray-200 px-4 py-3 space-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2 text-sm font-medium rounded-md",
                link.active ? "text-gray-900 bg-gray-50" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
