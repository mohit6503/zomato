import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    text: true, // for text search
  },
  location: {
    type: String,
    required: true,
  },
  cuisine: {
    type: [String], // e.g., ["Indian", "Chinese"]
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  deliveryTime: {
    type: Number, // in minutes
    required: true,
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    },
  ],
});

export default mongoose.model('Restaurant', restaurantSchema);
