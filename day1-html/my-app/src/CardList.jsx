// CardList.jsx
// This component OWNS the data and decides how many Cards to render.
// Card.jsx doesn't know or care where the data came from — CardList does.

import Card from './Card';
// import ← pulls in the Card component from Card.jsx.
// './Card' means "same folder, file named Card.jsx" — similar to
// #include "Card.h" in C++ (local file, not a system/library include).

const cardsData = [
  // array of objects — like a std::vector<Card> where each entry is a struct
  // holding the fields for one card. id is used below as React's `key`.
  { id: 1, title: "Ocean", description: "Blue and vast", imageUrl: "https://placehold.co/300x200?text=Ocean" },
  { id: 2, title: "Forest", description: "Green and quiet", imageUrl: "https://placehold.co/300x200?text=Forest" },
  { id: 3, title: "Desert", description: "Dry and golden", imageUrl: "https://placehold.co/300x200?text=Desert" },
  { id: 4, title: "Mountain", description: "Cold and tall", imageUrl: "https://placehold.co/300x200?text=Mountain" },
  { id: 5, title: "City", description: "Loud and bright", imageUrl: "https://placehold.co/300x200?text=City" },
];
// (using placehold.co so you get real images without needing your own files yet)

function CardList() {
  const handleCardClick = (title) => {
    // this lives in the PARENT — it's the "callback" that gets handed down
    // to each Card via the onClick prop.
    console.log(`Card clicked: ${title}`);
  };

  return (
    <div className="card-list">
      {cardsData.map((card) => (
        // .map() ← like std::transform: for each element in cardsData,
        // produce one <Card /> element. Returns a new array of JSX.

        <Card
          key={card.id}
          // key ← REQUIRED, React-internal. Helps React match list items
          // across re-renders. Never passed into Card as a real prop.
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          onClick={() => handleCardClick(card.title)}
          // arrow-fn wrapper ← delays execution until the actual click event.
          // Without it, handleCardClick(card.title) runs immediately during render.
        />
      ))}
    </div>
  );
}

export default CardList;