import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { loginUser, setLoginUser } = useContext(Auth);
  const { totalItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sm_session");
    setLoginUser(null);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-[#cef00f]" : "text-white/70 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#020202]/90 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 h-16 gap-6">
        <Link to="/home" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-[#cef00f] rounded-xl flex items-center justify-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-zap"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-heading font-bold text-lg text-white">
            Sky<span className="text-[#cef00f]">Mart</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white">
            <div className="w-6 h-6 bg-[#cef00f] rounded-lg flex items-center justify-center text-black text-sm">
              {loginUser?.name?.[0] || "S"}
            </div>
            <span className="max-w-[120px] truncate">{loginUser?.name || "Soham Dilip K."}</span>
          </div>

          <button 
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-white/8 hover:bg-white/12 border border-white/10 rounded-xl transition-all text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#cef00f] text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#020202]">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            title="Logout"
            onClick={handleLogout}
            className="p-2.5 bg-white/8 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 rounded-xl transition-all text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>

          <button className="md:hidden p-2.5 bg-white/8 border border-white/10 rounded-xl text-white transition-all hover:bg-white/12" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
