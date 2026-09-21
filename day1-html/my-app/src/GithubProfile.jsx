import { useState } from 'react'; // ← named import (curly braces) because useState is one of several named exports from 'react'
import api from './lib/api';       // ← default import, no curly braces — matches the `export default` above

function GithubProfile() {
  // Four independent pieces of state. Best practice: separate booleans/values
  // instead of one giant "status" object — keeps each setter call simple and each
  // re-render trigger obvious (React re-renders on ANY setState call, so smaller
  // state = clearer mental model of what changed).
  const [username, setUsername] = useState('');   // ← controlled input value
  const [profile, setProfile] = useState(null);    // ← null = "nothing fetched yet" (distinct from an empty object!)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);        // ← string message or null

  async function handleSearch() {
    const trimmed = username.trim(); // ← best practice: never trust raw input — " torvalds " and "torvalds" should behave the same
    if (!trimmed) {
      setError('Enter a username first.'); // ← guard clause: fail fast before spending a network call on empty input
      return;
    }

    setLoading(true); // ← flip loading BEFORE the request starts, so the UI can show a spinner immediately
    setError(null);   // ← clear any stale error from a previous failed search
    setProfile(null); // ← clear stale profile so old data doesn't flash while the new request is in flight

    try {
      const res = await api.get(`/users/${trimmed}`);
      // ↑ res.data is ALREADY a parsed JS object here — axios did the JSON.parse() for you.
      // With fetch you'd need: const res = await fetch(url); const data = await res.json();
      setProfile(res.data);
    } catch (err) {
      // Axios error objects have a specific shape — this is the "why" you'll need for debugging:
      if (err.response) {
        // Server responded, but with an error status (4xx/5xx) — e.g. GitHub returns 404 for unknown users.
        // Analogy: like catching a specific exception subclass with a known error code.
        setError(`GitHub says: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        // Request was sent, but NO response came back at all — DNS failure, offline, CORS block, timeout.
        setError('No response from server — check your connection.');
      } else {
        // Something went wrong just building/sending the request (rare, usually a typo in code).
        setError(`Request setup error: ${err.message}`);
      }
    } finally {
      setLoading(false); // ← finally block = ALWAYS runs, success or failure, like a C++ destructor/RAII guarantee. Prevents a stuck spinner.
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>GitHub Profile Viewer</h2>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)} // ← controlled input: React state is the single source of truth for the value
        placeholder="e.g. torvalds"
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // ← QoL: let Enter trigger search, not just the button
      />
      <button onClick={handleSearch} disabled={loading}>
        {/* disabled={loading} ← best practice: prevents double-firing the request if the user double-clicks while it's already loading */}
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* Empty state */}
      {!loading && !error && !profile && <p>Search a GitHub username to see their profile.</p>}

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Success state */}
      {profile && (
        <div>
          <img src={profile.avatar_url} alt={profile.login} width={100} />
          <h3>{profile.name || profile.login}</h3>
          <p>{profile.bio}</p>
          <p>Followers: {profile.followers} · Repos: {profile.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default GithubProfile;