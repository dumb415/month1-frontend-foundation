import { useState, useEffect } from "react";
// useState: component-local variable that re-renders the UI when it changes
// useEffect: a function that runs AFTER React paints — for side effects
//            (DOM writes, network calls, storage) that shouldn't happen during render

function ThemeToggle() {
  // The function passed to useState here is a LAZY INITIALIZER —
  // React calls it exactly ONCE, on the very first render.
  // Analogy: a `static` local variable in C/C++, initialized once and reused:
  //   static bool isDark = computeInitial();
  const [isDark, setIsDark] = useState(() => {
    try {
      // localStorage.getItem returns string | null — like fopen() returning NULL
      // if the file doesn't exist. ALWAYS handle the "not there yet" case.
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark"; // explicit comparison, not a truthy string check
      // No saved preference → fall back to the OS-level setting
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
      // matchMedia() queries a browser API for a system setting; .matches is a boolean —
      // similar to calling an OS API to check a system flag, e.g. GetSystemMetrics() on Windows
    } catch {
      // Best practice: localStorage can throw (e.g. some private-browsing modes block it).
      // Never let a non-critical read crash your component — degrade gracefully.
      return false;
    }
  });

  // This effect re-runs ONLY when `isDark` changes — the dependency array [isDark]
  // is like a Makefile rule: the target only rebuilds when its listed dependency changes.
  // Empty array [] = run once (like a constructor). No array = run after EVERY render (rarely what you want).
  useEffect(() => {
    const root = document.documentElement; // the <html> element — the DOM tree's root
    if (isDark) {
      root.classList.add("dark");
      // classList is a DOMTokenList — behaves like a set<string> of class names.
      // .add() is idempotent: calling it twice with "dark" doesn't duplicate anything,
      // unlike manually doing root.className += " dark" (which WOULD duplicate).
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
      // Persists the choice so a page reload (like restarting a program) remembers it —
      // equivalent to writing a config value to disk on change instead of only at exit.
    } catch {
      // Ignore — theme still works for this session even if storage is blocked.
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      // Functional updater form (prev) => !prev reads the LATEST state value at
      // update time. Safer than setIsDark(!isDark) — if React batches multiple
      // state updates together, `isDark` in that expression could be stale.
      // Analogy: fetch-and-add vs. read-then-write when a value might change
      // between the read and the write — the functional form is the atomic one.
      className="px-4 py-2 rounded-lg font-medium
                 bg-gray-200 text-gray-900
                 dark:bg-gray-800 dark:text-gray-100
                 transition-colors duration-200"
      aria-label="Toggle dark mode"
      // Accessibility best practice: an emoji-only button needs a text label
      // for screen readers, since there's no descriptive text content.
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;