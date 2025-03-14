import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="w-full my-3 flex items-center justify-end px-6 gap-4 text-lg text-white">
      <Link
        to="/search"
        className={`py-2 px-3 ${
          location.pathname === "/search" ? "border-2 rounded-2xl border-white" : ""
        }`}
      >
        Search
      </Link>
      <Link
        to="/favorites"
        className={`py-2 px-3 ${
          location.pathname === "/favorites" ? "border-2 rounded-2xl border-white" : ""
        }`}
      >
        Favorites
      </Link>
    </nav>
  );
};

export default Navbar;
