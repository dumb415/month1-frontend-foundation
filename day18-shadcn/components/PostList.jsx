"use client"; // ← directive: marks this file AND everything it imports as client code. Must be the very first line

import { useState } from "react"; // ← hooks only work in Client Components
import { Input } from "@/components/ui/input"; // ← shadcn Input from Day 18
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ← shadcn Card from Day 18

export default function PostList({ posts }) { // ← destructured prop (like a structured binding in C++17)
  const [query, setQuery] = useState(""); // ← state lives in the browser; server components can't hold this

  const visiblePosts = posts.filter((post) => // ← derived value: compute from state each render, don't store in a second state
    post.title.toLowerCase().includes(query.toLowerCase()) // ← case-insensitive match
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search posts..."
        value={query} // ← controlled input (Day 12)
        onChange={(e) => setQuery(e.target.value)} // ← event handler: browser-only concept
      />

      {visiblePosts.length === 0 && ( // ← handle the empty state explicitly (Day 14 pattern)
        <p className="text-sm text-muted-foreground">No posts match “{query}”.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <Card key={post.id}> {/* ← stable id as key, never the index (Day 12 lesson) */}
            <CardHeader>
              <CardTitle className="text-base capitalize">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{post.body}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}