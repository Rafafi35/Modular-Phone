import Home from "./pages/Home.jsx";
import Configure from "./pages/Configure.jsx";
import BuyParts from "./pages/BuyParts.jsx";
import Cart from "./pages/Cart.jsx";
import Navigation from "./components/Navigation.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configure" element={<Configure />} />
        <Route path="/buy-parts" element={<BuyParts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
