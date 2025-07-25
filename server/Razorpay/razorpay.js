import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

// console.log('KEY_ID:', process.env.RAZORPAY_KEY_ID); 

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default instance;
