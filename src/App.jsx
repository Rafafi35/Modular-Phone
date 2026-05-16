import Home from "./pages/Home.jsx";
import Configure from "./pages/Configure.jsx";
import BuyParts from "./pages/BuyParts.jsx";
import Community from "./pages/Community.jsx";
import Cart from "./pages/Cart.jsx";
import Navigation from "./components/Navigation.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (configuration) => {
    const newItem = {
      id: Date.now(),
      ...configuration,
    };
    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Navigation cartItemsCount={cartItems.length} />
      <Routes>
        <Route path="/Modular-Phone/" element={<Home />} />
        <Route path="/Modular-Phone/configure" element={<Configure onAddToCart={addToCart} />} />
        <Route path="/Modular-Phone/buy-parts" element={<BuyParts onAddToCart={addToCart} />} />
        <Route path="/Modular-Phone/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={removeFromCart} />} />
        <Route path="/Modular-Phone/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
