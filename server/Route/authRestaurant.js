import express from 'express';
import Restaurant from '../Model/Restaurent.js';

const router = express.Router();

// GET /api/restaurants?location=Delhi&cuisine=Indian&sortBy=rating
router.get('/', async (req, res) => {
  try {
    const { location, cuisine, sortBy } = req.query;

    const filter = {};
    if (location) filter.location = { $regex: new RegExp(`^${location}$`, 'i') };
    if (cuisine) filter.cuisine = { $regex: new RegExp(`^${cuisine}$`, 'i') };

    let sortOptions = {};
    if (sortBy === 'rating') sortOptions.rating = -1;
    if (sortBy === 'deliveryTime') sortOptions.deliveryTime = 1;

    const restaurants = await Restaurant.find(filter).sort(sortOptions);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
});

// POST /api/restaurants - Add new restaurant (TEMP for seeding)
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    const saved = await restaurant.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add restaurant', error: err.message });
  }
});


export default router;
