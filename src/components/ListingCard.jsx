import { Trash2 } from "lucide-react";

export default function ListingCard({ listing, onDelete }) {
  const getTypeLabel = (type) => {
    const labels = {
      borrow: "Borrow",
      rent: "Rent",
      sell: "Buy",
    };
    return labels[type] || type;
  };

  const getTypeBgColor = (type) => {
    const colors = {
      borrow: "bg-green-100 text-green-800",
      rent: "bg-blue-100 text-blue-800",
      sell: "bg-purple-100 text-purple-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{listing.partName}</h3>
          <p className="text-sm text-gray-600">{listing.city}</p>
        </div>
        <button
          onClick={() => onDelete(listing.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          title="Inserat löschen"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getTypeBgColor(listing.type)}`}>
          {getTypeLabel(listing.type)}
        </span>

        {listing.price > 0 && (
          <span className="text-lg font-bold text-gray-800">
            CHF {listing.price.toFixed(2)}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3">{listing.createdAt}</p>
    </div>
  );
}
