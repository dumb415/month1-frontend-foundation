"use client"; // required: usePathname is a hook, hooks only run in Client Components

import Link from "next/link"; // client-side navigation, no full page reload
import { usePathname } from "next/navigation"; // hook: returns current URL path, e.g. "/dashboard"
import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react"; // icons are React components
import { cn } from "@/lib/utils"; // cn(...) = join class strings, skipping falsy ones (shadcn helper)

// Data-driven nav: add a link = add one object. No copy-pasted JSX.
const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true }, // exact: true = highlight only on this precise URL
  { href: "/users", label: "Users", icon: Users }, // no page yet → shows not-found.js (free 404 test)
  { href: "/analytics", label: "Analytics", icon: BarChart3 }, // same
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname(); // re-renders this component whenever the route changes

  return (
    // fixed = pinned to the viewport | inset-y-0 = top:0 + bottom:0 | w-64 = 256px
    <aside className="fixed inset-y-0 left-0 w-64 border-r bg-background p-4">
      <div className="mb-8 px-3 text-lg font-semibold">Acme SaaS</div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          // `icon: Icon` = destructure AND rename (JSX needs a capital letter for components)
          // `exact` is undefined for links that don't set it → falsy → uses startsWith

          // exact link: URL must match perfectly | other links: URL just has to start with href
          const isActive = exact ? pathname === href : pathname.startsWith(href); // cond ? a : b, same as C++

          return (
            <Link
              key={href} // stable unique key, never the index
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                // Both branches are COMPLETE class strings, so Tailwind's scanner sees them
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
} // ← this closing brace was missing in what you pasted