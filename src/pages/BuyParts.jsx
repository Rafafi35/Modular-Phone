import { useState } from "react";
import items from "../data/items.js";

export default function BuyParts({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryLabels = {
    all: "All Items",
    base: "Base Phone",
    battery: "Battery",
    camera: "Camera",
    gimmick: "Gimmick",
  };

  // Flatten all items into a single list with category info
  const allItems = [];
  Object.entries(items).forEach(([category, categoryItems]) => {
    categoryItems.forEach((item) => {
      allItems.push({
        ...item,
        category: category,
      });
    });
  });

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "all"
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  function handleAddItem(item) {
    const cartItem = {
      type: "single",
      category: item.category,
      title: item.title,
      specs: item.specs,
      price: item.price,
    };
    onAddToCart(cartItem);
  }

  const categoryColors = {
    base: "bg-blue-100 border-blue-300",
    battery: "bg-yellow-100 border-yellow-300",
    camera: "bg-purple-100 border-purple-300",
    gimmick: "bg-green-100 border-green-300",
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Buy Parts</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
              selectedCategory === key
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className={`border-2 rounded-lg p-6 ${categoryColors[item.category]} shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded capitalize">
                {item.category}
              </span>
            </div>

            {item.specs && item.specs.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-4">
                {item.specs.map((spec, specIdx) => (
                  <li
                    key={specIdx}
                    className="bg-gray-200 rounded px-2 py-1 text-xs"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
              <p className="text-lg font-bold">CHF {item.price}</p>
              <button
                onClick={() => handleAddItem(item)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-8">No items found</p>
      )}
    </div>
  );
}
