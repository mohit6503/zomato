
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../component/Navbar";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/restaurants/${id}`);
        setRestaurant(res.data.restaurant);
        setFoodItems(res.data.foodItems);
      } catch (err) {
        console.error("Failed to load restaurant", err.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="px-6 py-10">
        {restaurant ? (
          <>
            <h1 className="text-3xl font-bold text-green-700 mb-6">{restaurant.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((item) => (
                <div key={item._id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/200?text=No+Image"}
                    alt={item.name}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button className="px-2 py-1 text-white bg-green-600 rounded-l">-</button>
                    <span className="px-3">1</span>
                    <button className="px-2 py-1 text-white bg-green-600 rounded-r">+</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading restaurant...</p>
        )}
      </div>
    </>
  );
};

export default Restaurant;
