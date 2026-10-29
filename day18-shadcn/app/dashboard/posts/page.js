// NO "use client" at top  ← in the App Router, every component is a Server Component by default
import PostList from "@/components/PostList"; // ← "@/" alias = project root (set up by create-next-app in jsconfig.json)

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=12"; // ← constant: no magic strings inside functions

async function getPosts() { // ← async function: allowed because this code runs on the server
  console.log("SERVER: fetching posts"); // ← shows in your TERMINAL, not the browser console (proves where it runs)

  const res = await fetch(POSTS_URL, { cache: "no-store" }); // ← Next.js-extended fetch; no-store = always fresh (Day 24 covers caching)

  if (!res.ok) { // ← fetch does NOT throw on 404/500, so check manually (same as Day 7/14)
    throw new Error(`Failed to fetch posts: ${res.status}`); // ← throw → caught by your Day 22 error.js
  }

  return res.json(); // ← parses the body into an array of post objects
}

export default async function PostsPage() { // ← async component: impossible in React-on-the-client, legal here
  const posts = await getPosts(); // ← no useEffect, no useState, no loading flag: just await

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Posts</h1>
      {/* ↓ data flows server → client as a PROP. Only serializable data (arrays, strings, numbers, plain objects) can cross */}
      <PostList posts={posts} />
    </div>
  );
}