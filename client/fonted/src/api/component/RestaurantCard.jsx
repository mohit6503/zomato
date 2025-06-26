import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/restaurant/${restaurant._id}`)} className="border p-4 rounded shadow hover:shadow-md cursor-pointer">
      <h3 className="text-lg font-bold">{restaurant.name}</h3>
      <p>Cuisine: {restaurant.cuisine}</p>
      <p>Rating: {restaurant.rating}</p>
      <p>Delivery: {restaurant.deliveryTime || "30 min"}</p>
    </div>
  );
};

export default RestaurantCard;
