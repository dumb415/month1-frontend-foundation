import { Link } from 'react-router-dom' // ← Link: like <a>, but intercepts the click in JS instead of asking the browser to fetch a new page

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>        {/* ← "to" not "href" — that's your tell you're not writing plain HTML */}
      <Link to="/about">About</Link>
      <Link to="/posts">Posts</Link>
    </nav>
  )
}

export default Navbar // ← default export: one Navbar per file, imported without curly braces elsewhere