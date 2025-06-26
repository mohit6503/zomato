// server/routes/userRoutes.js
import express from 'express';
import { requireAuth } from '../Middleware/authMiddleware.js';
import User from '../Model/User.js';

const router = express.Router();

router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

export default router;
