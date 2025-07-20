
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../component/Navbar";
import { useCart } from "../Context/CartContext.jsx";

const FoodItem = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState({});
  const [restaurantName, setRestaurantName] = useState("");
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/menu/${id}`);
        setMenu(res.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };

    const fetchRestaurant = async () => {
      try {
        const res = await api.get(`/restaurants`);
        const restaurant = res.data.find((r) => r._id === id);
        setRestaurantName(restaurant?.name || "Restaurant");
      } catch (err) {
        console.error("Failed to fetch restaurant name:", err);
      }
    };

    fetchMenu();
    fetchRestaurant();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="w-full px-6 py-8">
        <h1 className="text-4xl font-bold text-green-600 mb-8">
          {restaurantName}
        </h1>

        {Object.keys(menu).length === 0 ? (
          <p className="text-gray-500">No items found for this restaurant.</p>
        ) : (
          Object.entries(menu).map(([category, items]) => (
            <div
              key={category}
              className="mb-8 bg-white border border-gray-200 shadow-sm rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-4 border-b pb-2">
                {category}
              </h2>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="w-full border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-green-700">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="text-lg font-semibold text-gray-800">
                          ₹{item.price}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FoodItem;
