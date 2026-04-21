import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShowcaseLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-25">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-900">{title}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 max-w-2xl">
          <h1 className="font-display text-display-lg text-gray-900 tracking-tight">{title}</h1>
          <p className="mt-3 text-lg text-gray-600">{description}</p>
        </div>
        <div className="space-y-16">{children}</div>
      </div>
    </main>
  );
}

export function ShowcaseSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      <div className={cn("p-8 bg-white border border-gray-200 rounded-2xl shadow-xs", className)}>
        {children}
      </div>
    </section>
  );
}

export function ShowcaseRow({
  label,
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {label && <span className="text-xs font-mono text-gray-500 w-20 shrink-0">{label}</span>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
