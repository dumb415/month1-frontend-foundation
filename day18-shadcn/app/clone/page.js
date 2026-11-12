import { Plus, Search } from "lucide-react";
import ProjectCard from "@/components/clone/ProjectCard"; // @/ = project root alias (set in jsconfig.json)

// Day 26 skill. Server component, so no "use client" needed (nothing here uses state).
export const metadata = { title: "Projects – Vercel-style clone" };

// Module-level constant array of "structs". Real data would come from an API (Day 24 fetch).
const PROJECTS = [
  { id: 1, name: "saas-dashboard", domain: "saas-dashboard-woad-pi.vercel.app", commit: "feat: add generateMetadata for posts", branch: "main", time: "1d ago", status: "ready" },
  { id: 2, name: "portfolio", domain: "niloy.dev", commit: "style: dark terminal theme", branch: "main", time: "3d ago", status: "ready" },
  { id: 3, name: "todo-app", domain: "todo-app-two-eta.vercel.app", commit: "fix: key bug in list rendering", branch: "fix/keys", time: "2w ago", status: "ready" },
  { id: 4, name: "rag-chatbot", domain: "rag-chatbot.vercel.app", commit: "wip: embeddings pipeline", branch: "feat/embeddings", time: "5m ago", status: "building" },
  { id: 5, name: "stripe-demo", domain: "stripe-demo.vercel.app", commit: "chore: bump dependencies", branch: "main", time: "1mo ago", status: "error" },
  { id: 6, name: "github-viewer", domain: "github-viewer.vercel.app", commit: "feat: axios error handling", branch: "main", time: "2mo ago", status: "ready" },
];

const TABS = ["Overview", "Integrations", "Deployments", "Settings"];

export default function ClonePage() {
  return (
    // fixed inset-0 z-50: covers the whole viewport ABOVE the layout's sidebar/header (inset-0 = top/right/bottom/left: 0)
    // overflow-y-auto: this layer scrolls itself, because the body behind it can't
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black text-neutral-50">
      {/* sticky top-0: stays pinned while scrolling; bg-black/80 + backdrop-blur = frosted glass */}
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-black/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-6">
          <span aria-hidden="true" className="text-lg">▲</span> {/* aria-hidden: decorative, screen readers skip it */}
          <span className="text-neutral-600">/</span>
          <span className="text-sm font-medium">niloy&apos;s projects</span> {/* &apos; = escaped ' (JSX lint rule) */}
        </div>

        <nav className="mx-auto flex max-w-6xl gap-5 px-6 text-sm">
          {/* .map + key: Day 9. Index i used only to mark the first tab active (list is static, so safe) */}
          {TABS.map((tab, i) => (
            <a
              key={tab}
              href="#"
              className={`border-b-2 pb-3 transition-colors duration-150 ${
                i === 0
                  ? "border-neutral-50 text-neutral-50"
                  : "border-transparent text-neutral-400 hover:text-neutral-50"
              }`}
            >
              {tab}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1"> {/* relative: anchor for the absolutely-positioned icon */}
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search Projects..."
              aria-label="Search projects"
              className="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 pl-9 pr-3 text-sm placeholder:text-neutral-500 transition-colors duration-150 hover:border-neutral-600 focus:border-neutral-400 focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-md bg-neutral-50 px-3 text-sm font-medium text-black transition-colors duration-150 hover:bg-neutral-300"
          >
            <Plus className="size-4" />
            Add New...
          </button>
        </div>

        {/* Responsive grid: 1 col -> 2 (sm) -> 3 (lg), mobile-first (Day 16) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}