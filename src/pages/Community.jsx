import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ListingModal from "../components/ListingModal.jsx";
import ListingCard from "../components/ListingCard.jsx";

function Community() {
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load listings from localStorage on mount
  useEffect(() => {
    const savedListings = localStorage.getItem("communityListings");
    if (savedListings) {
      try {
        setListings(JSON.parse(savedListings));
      } catch (error) {
        console.error("Error loading listings:", error);
      }
    }
  }, []);

  // Save listings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("communityListings", JSON.stringify(listings));
  }, [listings]);

  const handleCreateListing = (listingData) => {
    setListings((prev) => [listingData, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteListing = (id) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Community</h1>
            <p className="text-gray-600 mt-2">Share, rent, sell or buy Phone Parts</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Modal */}
        <ListingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateListing}
        />

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-gray-200 p-12 text-center">

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onDelete={handleDeleteListing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;