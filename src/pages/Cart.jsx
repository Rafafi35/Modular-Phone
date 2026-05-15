export default function Cart({ cartItems = [], onRemoveFromCart = () => {} }) {
  // Calculate totals
  const getItemTotal = (item) => {
    if (item.type === "single") {
      return item.price;
    } else {
      return item.totalPrice || 0;
    }
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);

  return (
    <div className="p-8">
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-md">
              {item.type === "single" ? (
                // Single Item Display
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="text-sm bg-gray-300 text-gray-700 px-2 py-1 rounded inline-block mt-2 capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {item.specs && item.specs.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mb-4">
                      {item.specs.map((spec, idx) => (
                        <li key={idx} className="bg-gray-200 rounded px-2 py-1 text-xs">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                    <p className="text-lg font-bold">Price: CHF {item.price}</p>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                // Configuration Display
                <>
                  <h3 className="text-xl font-bold mb-4">Configuration {item.id}</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">Base Phone</h4>
                      <p className="text-gray-600">{item.base.title}</p>
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {item.base.specs.map((spec, idx) => (
                          <li key={idx} className="bg-gray-200 rounded px-2 py-1 text-xs">
                            {spec}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-700 font-semibold mt-2">CHF {item.base.price}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">Battery</h4>
                      <p className="text-gray-600">{item.battery.title}</p>
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {item.battery.specs.map((spec, idx) => (
                          <li key={idx} className="bg-gray-200 rounded px-2 py-1 text-xs">
                            {spec}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-700 font-semibold mt-2">CHF {item.battery.price}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">Camera</h4>
                      <p className="text-gray-600">{item.camera.title}</p>
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {item.camera.specs.map((spec, idx) => (
                          <li key={idx} className="bg-gray-200 rounded px-2 py-1 text-xs">
                            {spec}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-700 font-semibold mt-2">CHF {item.camera.price}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">Gimmick</h4>
                      <p className="text-gray-600">{item.gimmick.title}</p>
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {item.gimmick.specs.map((spec, idx) => (
                          <li key={idx} className="bg-gray-200 rounded px-2 py-1 text-xs">
                            {spec}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-700 font-semibold mt-2">CHF {item.gimmick.price}</p>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                    <p className="text-lg font-bold">Total: CHF {item.totalPrice}</p>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="border-t-2 border-gray-400 pt-6 mt-6">
            <p className="text-2xl font-bold text-right">
              Grand Total: CHF {grandTotal}
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
