import { NavLink } from "react-router-dom";
import { House, Wrench, ShoppingCart, Component, Smile } from "lucide-react"

export default function Navigation({ cartItemsCount = 0 }) {
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

        <NavLink to={"/community"} end className={linkStyle}>
            <Smile size={18} />
            Community
        </NavLink>

        <NavLink to="/cart" end className={linkStyle}>
          <div className="relative">
            <ShoppingCart size={18} />
            {cartItemsCount > 0 && (
              <span className="absolute -bottom-4 -right-14 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>
          Cart
        </NavLink>
      </div>
    </nav>
  );
}
