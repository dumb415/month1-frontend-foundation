// app/dashboard/posts/[id]/page.js
import { notFound } from "next/navigation"; // ← throws Next's built-in 404 (your Day 22 not-found.js)
import { API_BASE_URL } from "@/lib/config"; // ← same import as posts/page.js, one source of truth

// Shared fetch helper: one place for URL, error handling, and the 404 case
async function getPost(id) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    next: { revalidate: 3600 }, // ← Day 24: cache for 1 hour (ISR)
  });
  if (!res.ok) return null;     // ← network OK but API said 404/500
  const post = await res.json();
  if (!post.id) return null;    // ← JSONPlaceholder returns {} for unknown ids, not a 404 status
  return post;
}
// ← Identical fetch URL + options in both functions below = Next.js dedupes them: ONE request, not two.

export async function generateMetadata({ params }) {
  // ← special function name: Next.js calls it before rendering, per route.
  const { id } = await params;  // ← in Next 15+ `params` is a Promise, so await it
  const post = await getPost(id);

  if (!post) return { title: "Post not found" }; // ← safe fallback so the title is never "undefined"

  // ← /\s+/g matches any run of whitespace (spaces, \n, tabs); replace with one space.
  //   Same as a regex in Python's re.sub. The API body contains "\n".
  const description = post.body.replace(/\s+/g, " ").slice(0, 150);

  return {
    title: post.title,          // ← becomes "<post title> | SaaS Dashboard" via the layout template
    description,                // ← shorthand for description: description
    openGraph: {
      title: post.title,
      description,
      type: "article",                // ← og:type, more accurate for a single post
      siteName: "SaaS Dashboard",     // ← re-declared: a child openGraph REPLACES the parent's
      images: ["/opengraph-image"],   // ← explicit image; metadataBase makes it absolute
    },
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound(); // ← real 404 status code (matters for SEO)

  return (
    <article className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-muted-foreground">{post.body}</p>
    </article>
  );
}