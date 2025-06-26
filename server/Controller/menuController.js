import MenuItem from "../Model/MenuItem.js";
import Restaurant from "../Model/Restaurent.js";

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, price, description, category, available } = req.body;
    const restaurantId = req.params.restaurantId;

    const newItem = await MenuItem.create({
      name,
      price,
      description,
      category,
      available,
    });

    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { menu: newItem._id },
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all menu items for a restaurant
export const getMenuItems = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId).populate("menu");

    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const updated = await MenuItem.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const item = await MenuItem.findByIdAndDelete(itemId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    // Optional: Remove from restaurant.menu too
    await Restaurant.updateMany({ menu: itemId }, { $pull: { menu: itemId } });

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
