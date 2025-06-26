import express from 'express';
import razorpay from '../Razorpay/razorpay.js';
import crypto from 'crypto';

const router = express.Router();

//  Create order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  //  Convert to paise for Razorpay
  const options = {
    amount: Math.round(amount * 100),  // ₹499.00 → 49900
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    //  Send both raw and formatted back
    res.json({
      ...order,
      amountFormatted: `₹${(order.amount / 100).toFixed(2)} INR`  //  Shows 499.00
    });
  } catch (err) {
    res.status(500).json({ message: 'Order creation failed', error: err.message });
  }
});


router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    //  Save payment/order info to DB here
    res.json({ success: true, message: 'Payment verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});

export default router;