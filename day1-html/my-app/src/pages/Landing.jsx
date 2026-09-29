// Landing.jsx — Day 15 exercise: rebuild a landing page using ONLY Tailwind utility classes, zero custom CSS

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* min-h-screen → min-height: 100vh, so the page fills the viewport even with little content */}

      {/* ---------- HERO SECTION ---------- */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gray-50">
        {/* flex flex-col       → display:flex + flex-direction:column (stack children vertically) */}
        {/* items-center        → align-items:center  (centers children horizontally in a column flex) */}
        {/* justify-center      → justify-content:center (centers children vertically) */}
        {/* text-center         → text-align:center, for the text itself */}
        {/* px-6 py-24          → padding-left/right: 1.5rem, padding-top/bottom: 6rem (generous hero spacing) */}
        {/* bg-gray-50          → very light gray background, distinguishes hero from rest of page */}

        <h1 className="text-5xl font-extrabold text-gray-900 max-w-2xl">
          {/* text-5xl        → font-size: 3rem (big hero headline) */}
          {/* font-extrabold  → font-weight: 800 */}
          {/* max-w-2xl       → max-width: 42rem, prevents the line from stretching edge-to-edge on wide screens */}
          Build faster with a Tailwind-first workflow
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          {/* mt-6      → margin-top: 1.5rem, spaces this from the headline above */}
          {/* text-lg   → font-size: 1.125rem, slightly larger than body default */}
          {/* text-gray-600 → medium gray, lower visual weight than the black headline (hierarchy) */}
          No more switching files to write CSS — style directly where you build.
        </p>

        <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          {/* px-6 py-3        → horizontal/vertical padding, gives the button real click-target size */}
          {/* bg-blue-600      → solid blue background */}
          {/* rounded-lg       → border-radius: 0.5rem */}
          {/* hover:bg-blue-700 → Tailwind's hover: PREFIX — applies bg-blue-700 ONLY on :hover, no separate CSS rule needed */}
          {/* transition-colors → animates color changes smoothly instead of snapping instantly */}
          Get Started
        </button>
      </section>

      {/* ---------- FEATURE CARDS SECTION ---------- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-16 max-w-5xl mx-auto">
        {/* grid grid-cols-1     → mobile default: single column */}
        {/* md:grid-cols-3       → RESPONSIVE PREFIX: at md breakpoint (768px+) and up, switch to 3 columns */}
        {/* gap-6                → 1.5rem gap between grid items, both row and column gap */}
        {/* max-w-5xl mx-auto    → caps content width + centers it (mx-auto = margin-left/right: auto) */}

        {["Fast Setup", "Utility-First", "Fully Responsive"].map((title, i) => (
          // .map() over an inline array — same React list pattern you used for cardsData in CardList.jsx
          <div
            key={title}
            // key={title} ← using the title string as key since these are static, non-reorderable items — safe here (recall the key={index} pitfall from Day 12: only risky with reorderable lists or uncontrolled DOM state)
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* border border-gray-200 → 1px solid light gray border */}
            {/* shadow-sm            → subtle drop shadow */}
            {/* hover:shadow-md      → bigger shadow on hover, small polish detail */}
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-gray-500">
              {/* mt-2 → margin-top: 0.5rem, tighter spacing than the hero since this is a smaller text block */}
              Card #{i + 1} description goes here — placeholder text for the layout exercise.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Landing;   // ← same export pattern as your other page components