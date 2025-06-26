import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../zomato/src/api/axios.js";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/restaurants/${id}`
        );
        setRestaurant(data);
        setMenuItems(data.menu);
      } catch (err) {
        console.error("Error fetching restaurant details:", err);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
      <p className="text-gray-600">
        {restaurant.cuisine} | ⭐ {restaurant.rating}
      </p>

      <h2 className="text-2xl mt-6 mb-3">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-700">{item.description}</p>
            <p className="mt-2 font-bold">₹{item.price}</p>
            <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDetails;
