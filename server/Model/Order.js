import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem"
      },
      quantity: {
        type: Number,
        required: true
      },
      customization: {
        type: String
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "preparing", "on the way", "delivered"]
  },
  paymentId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);
