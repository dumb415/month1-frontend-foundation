// Fail fast: stop the build with a clear message instead of a mystery "undefined/posts" later
const API_BASE_URL = process.env.API_BASE_URL;   // process.env = environment variables (≈ getenv() in C++)

if (!API_BASE_URL) {                              // guard: catches a missing variable immediately
  throw new Error("API_BASE_URL is not set");     // throw = abort with this message
}

export { API_BASE_URL };                          // named export, imported where you fetch