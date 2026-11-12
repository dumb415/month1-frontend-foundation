import { GitBranch } from "lucide-react"; // named import of one icon component, like #include <only_this_header>

// Lookup table: status string -> COMPLETE class strings.
// Like a std::map<string, Style>. Tailwind scans source as plain text, so every class must appear whole.
const STATUS_STYLES = {
  ready: { dot: "bg-emerald-500", label: "Ready" },
  building: { dot: "bg-amber-500", label: "Building" },
  error: { dot: "bg-red-500", label: "Error" },
};

export default function ProjectCard({ project }) {
  // Destructuring = C++17 structured binding: auto [name, domain, ...] = project;
  const { name, domain, commit, branch, time, status } = project;

  // ?? = "use the right side only if the left is null/undefined" (safe default for bad data)
  const state = STATUS_STYLES[status] ?? STATUS_STYLES.ready;

  return (
    // group: lets children react to THIS element's hover via group-hover:* (not used yet, handy later)
    // transition-colors duration-150: animates only color changes over 150ms (Vercel-like snappy feel)
    <article className="group flex flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4 transition-colors duration-150 hover:border-neutral-600 hover:bg-neutral-900">
      <div className="flex items-center gap-3">
        {/* shrink-0: never let flexbox squash the avatar; size-10 = width + height 2.5rem */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-sm font-semibold uppercase">
          {name[0]} {/* first character, like name[0] on a std::string */}
        </div>

        {/* min-w-0: THE key line. A flex child defaults to min-width:auto (can't shrink below its content),
            so truncate would never trigger without this. Think: a struct refusing to be smaller than sizeof(content). */}
        <div className="min-w-0">
          {/* truncate = overflow-hidden + text-ellipsis + whitespace-nowrap */}
          <h3 className="truncate text-sm font-semibold leading-5">{name}</h3>
          <p className="truncate text-sm text-neutral-400">{domain}</p>
        </div>
      </div>

      <p className="truncate text-sm text-neutral-300">{commit}</p>

      <div className="flex items-center justify-between gap-3 text-xs text-neutral-400">
        <span className="flex min-w-0 items-center gap-1.5">
          <GitBranch className="size-3.5 shrink-0" />
          <span className="truncate">{branch}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          {/* Safe interpolation: state.dot is a whole string that exists in STATUS_STYLES above */}
          <span className={`size-2 rounded-full ${state.dot}`} />
          {state.label} · {time}
        </span>
      </div>
    </article>
  );
}