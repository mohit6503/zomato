import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.orderId) {
      navigate("/"); 
    }
  }, [state, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Order ID:</strong> {state?.orderId}
      </p>
      <p className="text-lg text-gray-700 mb-6">
        <strong>Transaction ID:</strong> {state?.paymentId}
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Go to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
