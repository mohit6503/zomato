
import { useEffect, useState } from "react";
import api from "../services/api.js";
import Navbar from "../component/Navbar.jsx";
import FilterBar from "../component/FilterBar.jsx";
import RestaurantCard from "../component/RestaurantCard.jsx";
import Footer from "../component/Footer.jsx";

const Home = () => {
  const [filters, setFilters] = useState({ location: "", cuisine: "", sortBy: "" });
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.location) params.location = filters.location.toLowerCase();
      if (filters.cuisine) params.cuisine = filters.cuisine.toLowerCase();
      if (filters.sortBy) params.sortBy = filters.sortBy;

      const res = await api.get("/restaurants", { params });
      setRestaurants(res.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-green-100 via-white to-green-50 py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-green-700 mb-4">Discover Delicious Food Near You</h1>
        <p className="text-gray-600 text-lg">Find top-rated restaurants and your favorite meals effortlessly.</p>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      <div className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full text-gray-500">Loading...</p>
        ) : restaurants.length ? (
          restaurants.map((r) => <RestaurantCard key={r._id} data={r} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">No restaurants found.</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
