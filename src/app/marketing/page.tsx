"use client";

import {
  Zap, Shield, Sparkles, Lock, BarChart3, Globe,
  Twitter, Github, Linkedin, ArrowRight,
} from "lucide-react";
import { ShowcaseLayout, ShowcaseSection } from "@/components/showcase";
import {
  Hero, SectionHeader, FeaturesGrid, CtaSection, PricingTable,
  FaqAccordion, Testimonial, LogoCloud, Footer, StatsSection,
} from "@/components/marketing/sections";

export default function MarketingPage() {
  return (
    <ShowcaseLayout
      title="Marketing"
      description="Drop-in sections for landing pages, product sites, and brochure pages. Each component composes into full pages."
    >
      <ShowcaseSection title="Hero · centered" className="!p-0 overflow-hidden">
        <Hero
          eyebrow="Just shipped v2.0"
          title="Build interfaces that feel inevitable"
          description="A complete component library for teams that ship. Production-grade React. Tailwind v4. Copy what you need."
          primaryCta={{ label: "Get started" }}
          secondaryCta={{ label: "View on GitHub" }}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Hero · split" className="!p-0 overflow-hidden">
        <Hero
          variant="split"
          eyebrow="Now with dark mode"
          title="The fastest way to ship beautiful UI"
          description="Skip the design phase. Sixty plus components, fully typed, accessible by default."
          primaryCta={{ label: "Start free trial" }}
          secondaryCta={{ label: "Book a demo" }}
          image={
            <div className="aspect-square bg-gradient-to-br from-brand-100 via-brand-50 to-warning-50 rounded-3xl flex items-center justify-center border border-brand-200">
              <Sparkles className="size-24 text-brand-600/40" />
            </div>
          }
        />
      </ShowcaseSection>

      <ShowcaseSection title="Features grid">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to move fast"
          description="Production-tested patterns, not prototypes."
          className="mb-12"
        />
        <FeaturesGrid
          features={[
            { icon: <Zap />, title: "Lightning fast", description: "Built on Tailwind v4 with native CSS variables. Zero runtime overhead." },
            { icon: <Shield />, title: "Accessible by default", description: "WAI-ARIA patterns, keyboard navigation, focus management out of the box." },
            { icon: <Sparkles />, title: "Beautifully designed", description: "Considered typography, color, and spacing. Looks great everywhere." },
            { icon: <Lock />, title: "Type-safe", description: "Full TypeScript support with sensible prop defaults and IntelliSense." },
            { icon: <BarChart3 />, title: "Charts included", description: "Recharts integration for area, bar, line, and donut visualizations." },
            { icon: <Globe />, title: "RTL ready", description: "Logical properties throughout, works in any direction or locale." },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Stats">
        <StatsSection
          stats={[
            { value: "60+", label: "Components" },
            { value: "12k", label: "Downloads" },
            { value: "99.9%", label: "Uptime" },
            { value: "4.9/5", label: "Rating" },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Pricing">
        <PricingTable
          tiers={[
            {
              name: "Starter",
              description: "For solo builders",
              price: "$0",
              period: "month",
              features: ["Up to 3 projects", "Community support", "Basic analytics", "1 GB storage"],
              cta: { label: "Get started" },
            },
            {
              name: "Pro",
              description: "For growing teams",
              price: "$29",
              period: "month",
              badge: "Most popular",
              featured: true,
              features: ["Unlimited projects", "Priority support", "Advanced analytics", "100 GB storage", "Team workspaces", "Custom integrations"],
              cta: { label: "Start free trial" },
            },
            {
              name: "Enterprise",
              description: "For large organizations",
              price: "Custom",
              features: ["Everything in Pro", "Dedicated support", "SSO & SAML", "Custom SLA", "On-premise option"],
              cta: { label: "Contact sales" },
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Testimonials">
        <div className="space-y-12">
          <Testimonial
            variant="centered"
            quote="This component library cut our design-to-ship time in half. The attention to detail is unreal."
            author={{ name: "Phoenix Baker", role: "Head of Design", company: "Untitled" }}
            rating={5}
          />
          <div className="grid md:grid-cols-3 gap-6">
            <Testimonial
              quote="Finally, a UI kit that doesn't look like every other AI-generated dashboard."
              author={{ name: "Olivia Rhye", role: "Product Designer" }}
              rating={5}
            />
            <Testimonial
              quote="The TypeScript support and prop ergonomics are exactly what I want from a modern library."
              author={{ name: "Lana Steiner", role: "Frontend Engineer" }}
              rating={5}
            />
            <Testimonial
              quote="We replaced our entire bespoke design system with this in a weekend. Saved months of work."
              author={{ name: "Demi Wilkinson", role: "CTO" }}
              rating={5}
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Logo cloud">
        <LogoCloud
          label="Trusted by teams at"
          logos={[
            { name: "ACME" }, { name: "Catalog" }, { name: "Quotient" },
            { name: "Hourglass" }, { name: "Layers" }, { name: "Sisyphus" },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="FAQ">
        <FaqAccordion
          items={[
            { question: "Is this open source?", answer: "Yes. The code is MIT licensed. Use it in commercial or personal projects without restriction." },
            { question: "Do I need to install anything?", answer: "Just clone the repo, run npm install, and copy the components you need into your project. No vendor lock-in." },
            { question: "Does it work with Next.js / Vite / Remix?", answer: "Yes. The components are framework-agnostic React. Any modern bundler will work." },
            { question: "What about accessibility?", answer: "Every component follows WAI-ARIA patterns. Focus management, keyboard navigation, and screen reader support are built in." },
            { question: "Can I customize the colors?", answer: "Yes. All colors are CSS variables defined in globals.css. Change one variable, the whole system updates." },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="CTA section · variants" className="!p-0 overflow-hidden">
        <div className="space-y-0">
          <CtaSection
            title="Ready to ship faster?"
            description="Join thousands of teams building beautiful interfaces in record time."
            primaryCta={{ label: "Start free trial" }}
            secondaryCta={{ label: "Talk to sales" }}
          />
          <CtaSection
            variant="dark"
            title="Built for teams that ship"
            description="Stop reinventing the same components. Start shipping product."
            primaryCta={{ label: "Get started" }}
            secondaryCta={{ label: "View pricing" }}
          />
          <CtaSection
            variant="brand"
            title="Try it free for 14 days"
            description="No credit card required. Cancel anytime."
            primaryCta={{ label: "Start trial" }}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Footer" className="!p-0 overflow-hidden">
        <Footer
          logo={<span className="font-display text-xl font-semibold">UI Kit</span>}
          description="A production-grade React component library. MIT licensed, used by thousands."
          social={[
            { icon: <Twitter />, href: "#", label: "Twitter" },
            { icon: <Github />, href: "#", label: "GitHub" },
            { icon: <Linkedin />, href: "#", label: "LinkedIn" },
          ]}
          columns={[
            { title: "Product", links: [
              { label: "Features", href: "#" }, { label: "Pricing", href: "#" },
              { label: "Changelog", href: "#" }, { label: "Roadmap", href: "#" },
            ]},
            { title: "Resources", links: [
              { label: "Documentation", href: "#" }, { label: "Components", href: "#" },
              { label: "Templates", href: "#" }, { label: "Tutorials", href: "#" },
            ]},
            { title: "Company", links: [
              { label: "About", href: "#" }, { label: "Blog", href: "#" },
              { label: "Careers", href: "#" }, { label: "Contact", href: "#" },
            ]},
            { title: "Legal", links: [
              { label: "Privacy", href: "#" }, { label: "Terms", href: "#" },
              { label: "Security", href: "#" }, { label: "Cookies", href: "#" },
            ]},
          ]}
          bottomText="© 2026 UI Kit. All rights reserved."
        />
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
