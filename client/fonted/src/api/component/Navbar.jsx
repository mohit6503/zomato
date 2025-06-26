import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <div className="text-2xl font-bold text-red-500">Zomato</div>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-red-500">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-red-500">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
