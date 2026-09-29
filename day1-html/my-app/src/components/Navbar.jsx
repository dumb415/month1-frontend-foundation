import { Link, useLocation } from "react-router-dom"; // ← already used since Day 13
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const location = useLocation(); // ← gives current path, used to highlight active link

  // helper function returns different classes based on whether this link is "active"
  // (like a ternary you'd write in C: active ? "highlighted" : "normal")
  const linkClass = (path) =>
    `hover:text-blue-500 transition-colors ${
      location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700"
    }`; // ← template literal (`...${}...`) is JS string interpolation, like sprintf

  return (
    // flex               ← display: flex (row by default)
    // justify-between    ← space-between on main axis (logo left, links right)
    // items-center       ← align-items: center on cross axis (vertical centering)
    // px-6 py-4          ← padding: 1.5rem left/right, 1rem top/bottom (Tailwind spacing scale, 1 unit = 0.25rem)
    // shadow-sm           ← subtle box-shadow, gives the navbar visual separation from content below
    <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white dark:bg-gray-900 dark:shadow-none">
      <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
        MyApp
      </Link>

      {/* gap-6 ← flex gap (space between children), replaces manual margin-right hacks */}
      <div className="flex gap-6">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/about" className={linkClass("/about")}>About</Link>
        <Link to="/github" className={linkClass("/github")}>GitHub</Link>
        <ThemeToggle /> 
      </div>
    </nav>
  );
}

export default Navbar;