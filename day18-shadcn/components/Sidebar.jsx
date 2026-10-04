"use client"; // required: usePathname is a hook, hooks only run in Client Components (your Day 18 Break B)

import Link from "next/link"; // like <Link> from React Router: client-side navigation, no full reload
import { usePathname } from "next/navigation"; // hook: returns current URL path, e.g. "/users"
import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react"; // icons are React components (shadcn ships lucide-react)
import { cn } from "@/lib/utils"; // cn(...) = join class strings, skipping falsy ones (shadcn helper)

// Data-driven nav: add a link = add one object. No copy-pasted JSX.
const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname(); // re-renders this component whenever the route changes

  return (
    // fixed = removed from normal flow, pinned to the viewport (like a floating overlay window)
    // inset-y-0 = top:0 + bottom:0 (full height) | left-0 = pin left | w-64 = 16rem = 256px
    <aside className="fixed inset-y-0 left-0 w-64 border-r bg-background p-4">
      <div className="mb-8 px-3 text-lg font-semibold">Acme SaaS</div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          // `icon: Icon` = destructure AND rename (like a C++ structured binding with a new name).
          // Renamed to capital I because JSX treats lowercase tags as HTML elements.

          // "/" must match EXACTLY, otherwise every route "starts with /"
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href} // stable unique key (Day 12), never the index
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                // Both branches are COMPLETE class strings, so Tailwind's scanner sees them (Day 16 lesson)
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4" /> {/* size-4 = w-4 h-4 shorthand */}
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}