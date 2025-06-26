import express from 'express';
import MenuItem from '../Model/MenuItem.js';

const router = express.Router();

// Add a menu item (POST)
router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error adding menu item', error: err.message });
  }
});

// Get all items for a restaurant, grouped by category
router.get('/:restaurantId', async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurantId: req.params.restaurantId });

    // Group by category
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

export default router;
