import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'restaurant', 'admin'], default: 'customer' },
  address: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], 
      default: [0, 0],
    },
  },
}, { timestamps: true });

userSchema.index({ location: '2dsphere' }); 

export default mongoose.model('User', userSchema);
