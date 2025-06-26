import express from 'express';
import Cart from '../Model/Cart.js';
import MenuItem from '../Model/MenuItem.js';

const router = express.Router();

//  Add or update item in cart
router.post('/add', async (req, res) => {
  const { userId, menuItemId, quantity = 1, customization = '' } = req.body;

  try {
    const menuItem = await MenuItem.findById(menuItemId);
    const subtotal = menuItem.price * quantity;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item with same customization exists
    const existingIndex = cart.items.findIndex(
      i => i.menuItem.equals(menuItemId) && i.customization === customization
    );

    if (existingIndex !== -1) {
      // update quantity
      cart.items[existingIndex].quantity += quantity;
      cart.items[existingIndex].subtotal = cart.items[existingIndex].quantity * menuItem.price;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity, customization, subtotal });
    }

    // Recalculate total
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.subtotal, 0);

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(400).json({ message: 'Error adding to cart', error: err.message });
  }
});

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.menuItem');
    res.json(cart || {});
  } catch (err) {
    res.status(400).json({ message: 'Error fetching cart' });
  }
});

//  Remove item
router.delete('/remove', async (req, res) => {
  const { userId, menuItemId, customization } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      i => !(i.menuItem.equals(menuItemId) && i.customization === customization)
    );

    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.subtotal, 0);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: 'Error removing item', error: err.message });
  }
});

export default router;
