import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurant/${data._id}`)}
      className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer transition duration-300 overflow-hidden"
    >
      <img
        src={data.image || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={data.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{data.name}</h3>
        <p className="text-sm text-gray-500 mb-2 capitalize">{data.cuisine}</p>
        <div className="flex justify-between text-sm text-gray-600">
          <span>⭐ {data.rating || "4.2"}</span>
          <span>{data.deliveryTime || "30"} min</span>
          <span>₹{data.price || "300"} for two</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
