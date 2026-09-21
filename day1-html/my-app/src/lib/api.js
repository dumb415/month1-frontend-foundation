import axios from 'axios'; // ← pulls in the axios module's default export (an object with .create, .get, .post, etc.)

// axios.create(config) returns a NEW axios instance pre-loaded with these settings.
// Analogy: a constructor that sets member defaults so every method call downstream
// doesn't need to repeat them — like a class with a baseUrl_ field set once in the ctor.
const api = axios.create({
  baseURL: 'https://api.github.com', // ← prepended to every relative URL you pass to api.get(), api.post(), etc.
  timeout: 8000,                      // ← ms. If no response in 8s, axios THROWS automatically (fetch has no built-in timeout at all)
  headers: {
    Accept: 'application/vnd.github+json', // ← GitHub's recommended Accept header; good practice to be explicit about API version expectations
  },
});

export default api; // ← default export = "the main thing this file provides" (like a single public class in a .h file)