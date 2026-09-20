// Card.jsx
// A reusable "presentational" component — it just displays data it's given,
// it doesn't own or fetch that data itself. That's the parent's job.

function Card({ title, description, imageUrl, onClick }) {
  // { title, description, imageUrl, onClick } ← destructuring the props object
  // right in the function signature, like:
  //   auto [title, description, imageUrl, onClick] = props; (C++ structured binding)
  // Cleaner than writing props.title, props.description everywhere below.

  return (
    <div className="card" onClick={onClick}>
      {/* onClick here is the NATIVE DOM event (lowercase).
          It's wired to fire the `onClick` prop function passed in from the parent. */}

      <img src={imageUrl} alt={title} />
      {/* alt={title} ← accessibility text for screen readers / if image fails to load.
          Always pair img with a meaningful alt, never leave it blank on purpose. */}

      <h2>{title}</h2>
      {/* {} ← JSX's "escape hatch": lets you drop a JS expression into markup */}

      <p>{description}</p>
    </div>
  );
}

export default Card;
// export default ← makes this the "main" thing this file exports.
// Lets other files do: import Card from './Card';
// (like exposing a single class/function from a .h file in C++)