"use client";

import * as React from "react";
import { ArrowRight, Check, Plus, Minus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/base/button";
import { Badge, BadgeGroup } from "@/components/base/badge";
import { Avatar } from "@/components/base/avatar";

/* === HERO === */
export interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
  image?: React.ReactNode;
  variant?: "centered" | "split";
}

export function Hero({ eyebrow, title, description, primaryCta, secondaryCta, image, variant = "centered" }: HeroProps) {
  if (variant === "split") {
    return (
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {eyebrow && (
                <BadgeGroup leadingText="New" color="brand" className="mb-6">
                  {eyebrow}
                </BadgeGroup>
              )}
              <h1 className="text-display-md md:text-display-lg font-semibold text-gray-900 tracking-tight">
                {title}
              </h1>
              <p className="mt-5 text-lg text-gray-600 max-w-xl">{description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {secondaryCta && (
                  <Button variant="secondary" size="xl" onClick={secondaryCta.onClick}>
                    {secondaryCta.label}
                  </Button>
                )}
                {primaryCta && (
                  <Button variant="primary" size="xl" onClick={primaryCta.onClick}>
                    {primaryCta.label}
                    <ArrowRight />
                  </Button>
                )}
              </div>
            </div>
            <div className="relative">{image}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-dot opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        {eyebrow && (
          <div className="flex justify-center mb-6">
            <BadgeGroup leadingText="New" color="brand">{eyebrow}</BadgeGroup>
          </div>
        )}
        <h1 className="text-display-lg md:text-display-xl font-semibold text-gray-900 tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {secondaryCta && (
            <Button variant="secondary" size="xl" onClick={secondaryCta.onClick}>
              {secondaryCta.label}
            </Button>
          )}
          {primaryCta && (
            <Button variant="primary" size="xl" onClick={primaryCta.onClick}>
              {primaryCta.label}
              <ArrowRight />
            </Button>
          )}
        </div>
        {image && <div className="mt-16 max-w-5xl mx-auto">{image}</div>}
      </div>
    </section>
  );
}

/* === SECTION HEADER === */
export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-3">{eyebrow}</p>
      )}
      <h2 className="text-display-sm md:text-display-md font-semibold text-gray-900 tracking-tight">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-gray-600">{description}</p>}
    </div>
  );
}

/* === FEATURES GRID === */
export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export function FeaturesGrid({
  features,
  columns = 3,
  variant = "boxed",
  className,
}: {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "boxed" | "minimal" | "icon-top";
  className?: string;
}) {
  const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];

  return (
    <div className={cn("grid grid-cols-1 gap-6 lg:gap-8", colClass, className)}>
      {features.map((f, i) => {
        if (variant === "minimal") {
          return (
            <div key={i}>
              {f.icon && (
                <div className="size-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mb-4 [&>svg]:size-5">
                  {f.icon}
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-base text-gray-600">{f.description}</p>
            </div>
          );
        }

        if (variant === "icon-top") {
          return (
            <div key={i} className="text-center">
              {f.icon && (
                <div className="mx-auto size-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 mb-4 ring-8 ring-brand-50 [&>svg]:size-6">
                  {f.icon}
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-base text-gray-600">{f.description}</p>
            </div>
          );
        }

        return (
          <div
            key={i}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs hover:shadow-md transition-shadow"
          >
            {f.icon && (
              <div className="size-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mb-4 [&>svg]:size-5">
                {f.icon}
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-base text-gray-600">{f.description}</p>
          </div>
        );
      })}
    </div>
  );
}

/* === CTA SECTION === */
export interface CtaSectionProps {
  title: string;
  description?: string;
  primaryCta?: { label: string; onClick?: () => void };
  secondaryCta?: { label: string; onClick?: () => void };
  variant?: "default" | "dark" | "brand";
}

export function CtaSection({ title, description, primaryCta, secondaryCta, variant = "default" }: CtaSectionProps) {
  const palette = {
    default: "bg-gray-50 text-gray-900",
    dark: "bg-gray-900 text-white",
    brand: "bg-brand-600 text-white",
  }[variant];

  const descColor = variant === "default" ? "text-gray-600" : "text-white/80";

  return (
    <section className={cn("py-16 md:py-24", palette)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-display-sm md:text-display-md font-semibold tracking-tight max-w-3xl mx-auto">
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 text-lg max-w-2xl mx-auto", descColor)}>{description}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {secondaryCta && (
            <Button
              variant={variant === "default" ? "secondary" : "secondary"}
              size="xl"
              onClick={secondaryCta.onClick}
              className={variant !== "default" ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : ""}
            >
              {secondaryCta.label}
            </Button>
          )}
          {primaryCta && (
            <Button
              variant={variant === "default" ? "primary" : "secondary"}
              size="xl"
              onClick={primaryCta.onClick}
              className={variant === "brand" ? "bg-white text-brand-700 hover:bg-gray-50 border-transparent" : variant === "dark" ? "bg-white text-gray-900 hover:bg-gray-50 border-transparent" : ""}
            >
              {primaryCta.label}
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/* === PRICING === */
export interface PricingTier {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  cta: { label: string; onClick?: () => void };
  featured?: boolean;
  badge?: string;
}

export function PricingTable({ tiers, className }: { tiers: PricingTier[]; className?: string }) {
  return (
    <div className={cn("grid gap-6 lg:gap-8", `lg:grid-cols-${tiers.length}`, className)}>
      {tiers.map((tier, i) => (
        <div
          key={i}
          className={cn(
            "relative flex flex-col p-8 rounded-3xl border transition",
            tier.featured
              ? "bg-gray-900 text-white border-gray-900 shadow-2xl scale-[1.02]"
              : "bg-white text-gray-900 border-gray-200 shadow-xs"
          )}
        >
          {tier.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge color="brand" variant="solid" size="md">{tier.badge}</Badge>
            </div>
          )}
          <div>
            <h3 className={cn("text-lg font-semibold", !tier.featured && "text-gray-900")}>{tier.name}</h3>
            {tier.description && (
              <p className={cn("mt-2 text-sm", tier.featured ? "text-white/70" : "text-gray-500")}>
                {tier.description}
              </p>
            )}
          </div>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-display-md font-semibold tracking-tight">{tier.price}</span>
            {tier.period && (
              <span className={cn("text-base", tier.featured ? "text-white/70" : "text-gray-500")}>
                /{tier.period}
              </span>
            )}
          </div>
          <Button
            variant={tier.featured ? "secondary" : "primary"}
            size="lg"
            className={cn("mt-8 w-full", tier.featured && "bg-white text-gray-900 hover:bg-gray-100 border-transparent")}
            onClick={tier.cta.onClick}
          >
            {tier.cta.label}
          </Button>
          <ul className="mt-8 space-y-3 flex-1">
            {tier.features.map((f, j) => (
              <li key={j} className="flex items-start gap-3 text-sm">
                <Check
                  className={cn("size-5 shrink-0 mt-0.5", tier.featured ? "text-success-400" : "text-success-600")}
                  strokeWidth={2.5}
                />
                <span className={tier.featured ? "text-white/90" : "text-gray-700"}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* === FAQ === */
export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-gray-200 border-y border-gray-200", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-medium text-gray-900">{item.question}</span>
              <span className="shrink-0 mt-0.5 text-gray-500">
                {isOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}
              </span>
            </button>
            {isOpen && (
              <div className="pb-5 text-base text-gray-600 animate-fade-in-up">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* === TESTIMONIAL === */
export interface TestimonialProps {
  quote: string;
  author: { name: string; role?: string; company?: string; avatar?: string };
  rating?: number;
  variant?: "card" | "centered";
}

export function Testimonial({ quote, author, rating, variant = "card" }: TestimonialProps) {
  if (variant === "centered") {
    return (
      <figure className="text-center max-w-3xl mx-auto">
        {rating && (
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="size-5 fill-warning-400 text-warning-400" />
            ))}
          </div>
        )}
        <blockquote className="font-display text-2xl md:text-3xl text-gray-900 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-4">
          <Avatar
            size="lg"
            src={author.avatar}
            initials={author.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
          />
          <div className="text-left">
            <p className="font-semibold text-gray-900">{author.name}</p>
            {(author.role || author.company) && (
              <p className="text-sm text-gray-500">
                {author.role}{author.role && author.company && " · "}{author.company}
              </p>
            )}
          </div>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="p-8 bg-white border border-gray-200 rounded-2xl shadow-xs">
      {rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-warning-400 text-warning-400" />
          ))}
        </div>
      )}
      <blockquote className="text-gray-700 leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar
          size="md"
          src={author.avatar}
          initials={author.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{author.name}</p>
          {(author.role || author.company) && (
            <p className="text-xs text-gray-500">
              {author.role}{author.role && author.company && " · "}{author.company}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

/* === LOGO CLOUD === */
export function LogoCloud({ logos, label }: { logos: { name: string; src?: string }[]; label?: string }) {
  return (
    <div className="text-center">
      {label && (
        <p className="text-sm font-medium text-gray-500 mb-8">{label}</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center justify-center text-gray-400 font-semibold text-lg">
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo.src} alt={logo.name} className="h-7 w-auto opacity-60 hover:opacity-100 transition" />
            ) : (
              <span>{logo.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* === FOOTER === */
export interface FooterProps {
  logo?: React.ReactNode;
  description?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
  social?: { icon: React.ReactNode; href: string; label: string }[];
  bottomText?: string;
  className?: string;
}

export function Footer({ logo, description, columns, social, bottomText, className }: FooterProps) {
  return (
    <footer className={cn("bg-white border-t border-gray-200", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            {logo}
            {description && <p className="mt-4 text-sm text-gray-600 max-w-xs">{description}</p>}
            {social && (
              <div className="mt-6 flex items-center gap-4">
                {social.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="text-gray-400 hover:text-gray-600 transition [&>svg]:size-5"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          {columns && (
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {columns.map((col, i) => (
                <div key={i}>
                  <h4 className="text-sm font-semibold text-gray-900">{col.title}</h4>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((link, j) => (
                      <li key={j}>
                        <a
                          href={link.href}
                          className="text-sm text-gray-600 hover:text-gray-900 transition"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {bottomText && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">{bottomText}</p>
          </div>
        )}
      </div>
    </footer>
  );
}

/* === STATS SECTION === */
export function StatsSection({
  stats,
  className,
}: {
  stats: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12", className)}>
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <p className="text-display-md md:text-display-lg font-semibold text-brand-700 tracking-tight">
            {s.value}
          </p>
          <p className="mt-2 text-base text-gray-600">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
