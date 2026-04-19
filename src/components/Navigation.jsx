import { NavLink } from "react-router-dom";

export default function Navigation() {
  const linkStyle = ({ isActive }) =>
    `m-4 p-2 rounded-xl transition-colors hover:bg-gray-100 ${
      isActive ? "bg-gray-200" : ""
    }`;

  return (
    <nav className="sticky top-0 left-0 w-full bg-white border-b-2 border-gray-200">
        <div className="flex font-bold justify-center">
                <NavLink to="/" end className={linkStyle}>
                    Home
                </NavLink>

                <NavLink to="/configure" end className={linkStyle}>
                    Configure
                </NavLink>

                <NavLink to="/buy-parts" end className={linkStyle}>
                    Buy Parts
                </NavLink>

                <NavLink to="/cart" end className={linkStyle}>
                    Cart
                </NavLink>
        </div>
    </nav>
  );
}

