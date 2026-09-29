import Button from "../components/Button";
import CardGrid from "../components/CardGrid"; // ← new import, same pattern as Button

// sample data array — normally this would come from an API (like Day 7/14),
// but for testing layout we hardcode it, similar to a mock/stub in C++ unit tests
const sampleItems = [
  { id: 1, title: "Frontend", description: "HTML, CSS, JS, React, Tailwind" },
  { id: 2, title: "Backend/AI", description: "Node, Python, LLM APIs" },
  { id: 3, title: "RAG", description: "Embeddings, vector DBs, retrieval" },
  { id: 4, title: "Payments", description: "Stripe integration" },
  { id: 5, title: "Agents", description: "Tool-calling, autonomous workflows" },
  { id: 6, title: "Freelancing", description: "Upwork, portfolio, client work" },
];

function Home() {
  return (
    <>
      {/* <> </> is a Fragment — groups two top-level elements (section + CardGrid)
          without adding an extra wrapper <div> to the DOM. Like an anonymous
          namespace in C++: it organizes without adding a visible layer. */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Build. Ship. Freelance.</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          A 6-month path from fundamentals to paid AI freelance work.
        </p>
        <Button variant="primary">Get Started</Button>
      </section>

      <CardGrid items={sampleItems} />
    </>
  );
}

export default Home;