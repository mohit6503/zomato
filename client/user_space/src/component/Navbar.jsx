import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const buttonClass =
    "px-5 py-2 rounded-full bg-white text-green-600 font-medium border-2 border-green-600 hover:bg-red-500 hover:text-white transition duration-200";

  return (
    <nav className="w-full h-[100px] flex items-center justify-between px-10 bg-white shadow-lg">
      <h1
        className="text-4xl font-extrabold text-green-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Zomato
      </h1>

      <div className="space-x-4 flex items-center">
        <button onClick={() => navigate("/")} className={buttonClass}>
          Home
        </button>

        <button onClick={() => navigate("/cart")} className={buttonClass}>
          Cart
        </button>

        {isLoggedIn ? (
          <button onClick={handleLogout} className={buttonClass}>
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className={buttonClass}>
              Login
            </button>
            <button onClick={() => navigate("/register")} className={buttonClass}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
