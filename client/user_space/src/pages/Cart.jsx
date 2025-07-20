import Navbar from "../component/Navbar";
import { useCart } from "../Context/CartContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "cod") {
      alert("Order placed successfully with Cash on Delivery!");
      navigate("/order-success", {
        state: {
          orderId: `COD-${Date.now()}`,
          paymentId: "Not Applicable",
        },
      });
    } else {
      try {
        const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
          amount: total,
        });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "Zomato Order",
          description: "Food Payment",
          order_id: data.id,
          handler: async function (response) {
            const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              navigate("/order-success", {
                state: {
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                },
              });
            } else {
              alert("Payment verification failed!");
            }
          },
          theme: {
            color: "#EF4444",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong during payment.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded shadow text-center text-gray-500 text-lg">
            Your cart is empty.
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b p-4"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <div className="flex items-center mt-2 space-x-3">
                    <span className="text-sm text-gray-500">Qty:</span>
                    <button
                      onClick={() => decreaseQty(item._id)} 
                      className="bg-gray-200 px-2 rounded font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="text-black">{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item._id)} 
                      className="bg-gray-200 px-2 rounded font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-700">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}

            <div className="flex justify-between items-center px-4 py-6 border-t">
              <h2 className="text-2xl font-bold text-green-800">
                Total: ₹{total}
              </h2>
              <button
                onClick={handleOrder}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
              >
                Order Now
              </button>
            </div>
          </div>
        )}

        <div className="mt-6">
          <label className="block font-semibold text-white-700 mb-2">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 text-black bg-white"
          >
            <option value="">Select payment type</option>
            <option value="cod">Cash on Delivery</option>
            <option value="phonepe">PhonePe (via Razorpay)</option>
            <option value="gpay">Google Pay (via Razorpay)</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Cart;
