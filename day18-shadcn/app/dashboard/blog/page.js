// app/dashboard/blog/page.js
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10"; // ?_limit=10 = query param: API returns only 10 posts

async function getPosts() {
  // Blog posts rarely change -> cache, refresh at most once per hour (3600 s) = ISR
  const res = await fetch(POSTS_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Posts fetch failed: ${res.status}`);
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts(); // no useEffect, no useState: the data is already here when HTML is sent

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Blog</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="rounded-lg border p-4"> {/* key = stable API id, never the index (Day 12) */}
            <h2 className="font-semibold capitalize">{post.title}</h2>
            <p className="text-sm text-muted-foreground">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}