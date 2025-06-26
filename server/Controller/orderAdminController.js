import Order from "../Model/Order.js";

// Get all orders for a restaurant
export const getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await Order.find({ restaurantId: req.params.restaurantId }).populate("items");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional) Get sales analytics
export const getSalesAnalytics = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const analytics = await Order.aggregate([
      { $match: { restaurantId: restaurantId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$total" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
