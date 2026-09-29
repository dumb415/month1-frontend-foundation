function CardGrid({ items }) {
  return (
    // grid                       ← display: grid
    // grid-cols-1                ← 1 column by default (phones)
    // md:grid-cols-2             ← 2 columns from 768px up (tablets)
    // lg:grid-cols-3             ← 3 columns from 1024px up (desktops)
    // gap-6                      ← 1.5rem gutter between grid cells, both axes
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item) => ( // ← .map() from Day 9, key required (Day 12 lesson on defaultChecked bug)
        <div
          key={item.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CardGrid;