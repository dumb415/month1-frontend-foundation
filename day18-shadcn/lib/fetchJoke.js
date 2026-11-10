// lib/fetchJoke.js
const JOKE_URL = "https://dummyjson.com/quotes/random"; // returns { id, quote, author }, a different random quote per real request
// `options` = 2nd argument of fetch(): a settings object, like passing a config struct in C++
export async function fetchJoke(options) { // export = importable from other files; async = returns a Promise (like std::future<T>)
  const res = await fetch(JOKE_URL, options); // await = wait for the response without blocking the server (like future.get(), but non-blocking)

  if (!res.ok) { // res.ok is true only for status 200-299. fetch does NOT throw on 404/500, so you must check.
    throw new Error(`Joke API failed: ${res.status}`); // throw -> the error.js boundary from Day 22 catches it
  }

  return res.json(); // parses the body into a JS object (returns a Promise; the caller awaits it)
}