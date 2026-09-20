import { Routes, Route } from 'react-router-dom' // ← Routes: the container; Route: one URL→component mapping
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Posts from './pages/Posts'
import PostDetail from './pages/PostDetail'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} /> {/* ← :id is a placeholder, captured by useParams */}
        <Route path="*" element={<h1>404 — Not Found</h1>} /> {/* ← catches any unmatched URL */}
      </Routes>
    </>
  )
}
export default App