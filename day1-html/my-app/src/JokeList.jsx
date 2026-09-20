import { useState, useEffect } from 'react';
// useState: same as Day 10 — reactive variable + setter
// useEffect: new today — run side-effect code tied to render/dependency changes

function JokeList() {
  // -- State setup --
  const [jokes, setJokes] = useState([]);       // [] initial value ← empty array, like std::vector<Joke> jokes;
  const [loading, setLoading] = useState(true); // tracks fetch-in-progress, so we can show a spinner/text
  const [error, setError] = useState(null);     // null = no error yet; will hold an error message if fetch fails

  // fetchJokes is defined OUTSIDE useEffect so both the mount-effect
  // and the Refresh button can call the same function (no duplicate logic —
  // same principle as factoring a helper function out of main() in C++)
  async function fetchJokes() {
    setLoading(true);   // flip loading on BEFORE the async call starts
    setError(null);     // clear any previous error on a fresh attempt
    try {
      const res = await fetch('https://official-joke-api.appspot.com/jokes/ten');
      // await ≈ blocking call in synchronous C++ code, but it doesn't
      // block the whole thread — JS just pauses THIS function and lets
      // the rest of the program keep running (event loop, not OS threads)

      if (!res.ok) {
        // fetch does NOT throw on 404/500 like you might expect —
        // it only rejects on network failure. You must check res.ok yourself.
        // (Unlike a C++ function that returns an error code you're forced to check,
        // JS lets you silently ignore this if you don't opt in — so always check it.)
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json(); // parse response body as JSON → JS array of objects
      setJokes(data);
    } catch (err) {
      // catches BOTH network failures and the throw above
      setError(err.message);
    } finally {
      setLoading(false); // always runs, success or failure — like a C++ destructor guaranteeing cleanup
    }
  }

  // -- The lifecycle hook --
  useEffect(() => {
    fetchJokes(); // run once when component first mounts
  }, []); // empty array = "no dependencies" = run only after the FIRST render, never again

  // -- Render logic --
  if (loading) return <p>Loading jokes...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <div>
      <button onClick={fetchJokes}>Refresh</button>
      {/* onClick calls the SAME fetchJokes function — reusing logic, not duplicating it */}
      <ul>
        {jokes.map((joke) => (
          // key prop: React needs a stable unique id per list item to track
          // which DOM node maps to which data — like a primary key in SQL.
          // joke.id comes from the API response itself.
          <li key={joke.id}>
            <strong>{joke.setup}</strong> — {joke.punchline}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JokeList;