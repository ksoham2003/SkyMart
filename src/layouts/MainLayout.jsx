import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Auth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

function MainLayout() {
  const { loginUser } = useContext(Auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
  }, [loginUser, navigate]);

  if (!loginUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-x-hidden">
        <CartDrawer />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
    </div>
  );
}

export default MainLayout;