import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // ← useParams: reads the dynamic segment out of the URL

function PostDetail() {
  const { id } = useParams() // ← destructures ":id" from the route path — if URL is /posts/7, id === "7" (a STRING, not a number)
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error('Failed to fetch post:', err))
  }, [id]) // ← id is in the dependency array — re-fetches when the URL param changes

  if (!post) return <p>Loading...</p>

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}
export default PostDetail