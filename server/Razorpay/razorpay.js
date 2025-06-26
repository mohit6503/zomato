import Razorpay from 'razorpay';
import dotenv from 'dotenv';

console.log('KEY_ID:', process.env.RAZORPAY_KEY_ID); // Debug
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default instance;
