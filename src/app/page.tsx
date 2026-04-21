import Link from "next/link";
import { ArrowRight, Layers, AppWindow, Megaphone, Lock } from "lucide-react";

const sections = [
  {
    href: "/base",
    title: "Base",
    description: "Buttons, inputs, badges, avatars, toggles, tooltips, and other primitives.",
    icon: <Layers className="size-5" />,
    count: "25+ components",
  },
  {
    href: "/application",
    title: "Application UI",
    description: "Modals, tables, sidebars, navigation, charts, file upload, and toast notifications.",
    icon: <AppWindow className="size-5" />,
    count: "20+ components",
  },
  {
    href: "/marketing",
    title: "Marketing",
    description: "Hero sections, pricing tables, testimonials, FAQs, footers, and CTA blocks.",
    icon: <Megaphone className="size-5" />,
    count: "12+ sections",
  },
  {
    href: "/auth",
    title: "Auth & Pages",
    description: "Login, signup, forgot password, and 404 templates.",
    icon: <Lock className="size-5" />,
    count: "4 pages",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-25">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-16">
          <p className="text-sm font-mono text-gray-500 mb-4">v1.0.0 · production-ready</p>
          <h1 className="font-display text-display-xl md:text-display-2xl text-gray-900 tracking-tight leading-[0.95]">
            A component library<br />you can actually copy.
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Sixty-plus production-grade React components. Tailwind v4. TypeScript. No runtime
            dependencies on a UI vendor. Browse, copy the file you need, paste into your project.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group p-6 bg-white border border-gray-200 rounded-2xl shadow-xs hover:shadow-md hover:border-brand-300 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  {s.icon}
                </div>
                <ArrowRight className="size-5 text-gray-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{s.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{s.description}</p>
              <p className="mt-4 text-xs font-mono text-gray-500">{s.count}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white border border-gray-200 rounded-2xl">
          <h3 className="font-semibold text-gray-900">Quick start</h3>
          <pre className="mt-4 p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono overflow-x-auto">
{`# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build`}
          </pre>
        </div>
      </div>
    </main>
  );
}
