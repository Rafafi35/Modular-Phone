import { useState } from "react";
import { X } from "lucide-react";

export default function ListingModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    partName: "",
    city: "",
    type: "borrow",
    price: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.partName.trim()) {
      newErrors.partName = "Part-Name is needed";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is needed";
    }
    if (formData.type !== "borrow") {
      if (!formData.price || parseFloat(formData.price) <= 0) {
        newErrors.price = "Price is needed";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const listingData = {
      id: Date.now(),
      partName: formData.partName.trim(),
      city: formData.city.trim(),
      type: formData.type,
      price: formData.type === "borrow" ? 0 : parseFloat(formData.price),
      createdAt: new Date().toLocaleDateString("de-DE"),
    };

    onSubmit(listingData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      partName: "",
      city: "",
      type: "borrow",
      price: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create new Listing</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Part-Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Part-Name *
            </label>
            <input
              type="text"
              name="partName"
              value={formData.partName}
              onChange={handleInputChange}
              placeholder="Battery Pro, Ultra Camera, ..."
              className="w-full border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {errors.partName && (
              <p className="text-red-500 text-sm mt-1">{errors.partName}</p>
            )}
          </div>

          {/* Stadt */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Zürich, Bern, ..."
              className="w-full border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* Inserat-Typ */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Inserat-Typ *
            </label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="borrow"
                  checked={formData.type === "borrow"}
                  onChange={handleInputChange}
                  className="mr-2 cursor-pointer"
                />
                <span>Borrowing (free)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="rent"
                  checked={formData.type === "rent"}
                  onChange={handleInputChange}
                  className="mr-2 cursor-pointer"
                />
                <span>Rent</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="sell"
                  checked={formData.type === "sell"}
                  onChange={handleInputChange}
                  className="mr-2 cursor-pointer"
                />
                <span>Sell</span>
              </label>
            </div>
          </div>

          {/* Preis (nur für Miete und Verkauf) */}
          {formData.type !== "borrow" && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Price (CHF) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full border-2 border-gray-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
