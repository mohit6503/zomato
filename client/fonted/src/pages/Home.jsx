import { useEffect, useState } from "react";
import api from "../../../zomato/src/api/axios.js";
import Navbar from "../api/component/Navbar.jsx";
import LocationInput from "../api/component/LocationInput.jsx";
import RestaurantCard from "../api/component/RestaurantCard.jsx";

const Home = () => {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get(`/restaurants`, {
        params: { location },
      });
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location) fetchRestaurants();
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <LocationInput onLocationChange={setLocation} />
        <h2 className="text-xl font-semibold mt-4 mb-2">
          Restaurants Near You
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {restaurants.map((r) => (
            <RestaurantCard key={r._id} restaurant={r} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
