import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Posts() {
  const [posts, setPosts] = useState([])          // ← same useState pattern from Day 10
  const [loading, setLoading] = useState(true)     // ← best practice: track loading state, don't assume fetch is instant

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.slice(0, 10)) // ← only take first 10 — the API returns 100
        setLoading(false)
      })
      .catch(err => console.error('Failed to fetch posts:', err)) // ← error handling: never let a rejected fetch fail silently
  }, []) // ← empty dependency array = run once on mount

  if (loading) return <p>Loading...</p> // ← early return guard

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>                        {/* ← key = post.id, not index — you know why from Day 12 */}
            <Link to={`/posts/${post.id}`}>{post.title}</Link> {/* ← template literal builds e.g. /posts/7 */}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Posts