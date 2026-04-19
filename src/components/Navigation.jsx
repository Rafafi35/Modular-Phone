import { NavLink } from "react-router-dom";
import { House, Wrench, ShoppingCart, Component } from "lucide-react"

export default function Navigation() {
  const linkStyle = ({ isActive }) =>
    `m-4 p-2 rounded-xl transition-colors hover:bg-gray-100 inline-flex items-center gap-2 ${
      isActive ? "bg-gray-200" : ""
    }`;

  return (
    <nav className="sticky top-0 left-0 w-full bg-white border-b-2 border-gray-200">
      <div className="flex font-bold justify-center">
        <NavLink to="/" end className={linkStyle}>
          <House size={18} />
          Home
        </NavLink>

        <NavLink to="/configure" end className={linkStyle}>
          <Wrench size={18} />
          Configure
        </NavLink>

        <NavLink to="/buy-parts" end className={linkStyle}>
          <Component size={18} />
          Buy Parts
        </NavLink>

        <NavLink to="/cart" end className={linkStyle}>
          <ShoppingCart size={18} />
          Cart
        </NavLink>
      </div>
    </nav>
  );
}
