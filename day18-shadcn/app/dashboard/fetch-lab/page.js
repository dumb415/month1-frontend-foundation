// app/dashboard/fetch-lab/page.js
import { fetchJoke } from "@/lib/fetchJoke"; // "@/" = alias for project root (set in jsconfig.json)

// Small presentational helper. No state, no hooks -> stays a Server Component.
function JokeCard({ label, mode, joke }) { // { } in the parameter list = destructuring props (like a C++17 structured binding)
  return (
    <div className="rounded-lg border p-4 space-y-1">
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs text-muted-foreground">{mode}</p>
      <p className="font-mono text-sm">id: {joke.id}</p> {/* id is how you tell quotes apart at a glance */}
      <p>{joke.quote}</p> {/* dummyjson field: the quote text */}
      <p className="italic">{joke.author}</p> {/* dummyjson field: who said it */}
    </div>
  );
}

export default async function FetchLabPage() { // async component: legal ONLY in Server Components (Day 23)
  // Promise.all = start all 3 requests in parallel, wait for all of them.
  // [a, b, c] = array destructuring, one name per result, in order.
  const [cached, live, timed] = await Promise.all([
    fetchJoke({ cache: "force-cache" }),       // cache until redeploy (static data)
    fetchJoke({ cache: "no-store" }),          // never cache: hits the API on every request
    fetchJoke({ next: { revalidate: 10 } }),   // `next` key = Next.js-only extension: cache, but stale after 10 seconds
  ]);

  const renderedAt = new Date().toISOString(); // runs on the SERVER at render time, not in the browser

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Fetch Lab</h1>
      <p className="font-mono text-sm">rendered at: {renderedAt}</p>
      <div className="grid gap-4 md:grid-cols-3">
        <JokeCard label="A: static"     mode='cache: "force-cache"'      joke={cached} />
        <JokeCard label="B: live"       mode='cache: "no-store"'         joke={live} />
        <JokeCard label="C: revalidate" mode="next: { revalidate: 10 }"   joke={timed} />
      </div>
    </div>
  );
}