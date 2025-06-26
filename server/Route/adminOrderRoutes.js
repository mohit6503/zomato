import express from "express";
import {
  getOrdersByRestaurant,
  updateOrderStatus,
  getSalesAnalytics,
} from "../Controller/orderAdminController.js";

import { protect, isRestaurant } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Get all orders for restaurant
router.get("/:restaurantId", protect, isRestaurant, getOrdersByRestaurant);

// Update status
router.put("/:orderId", protect, isRestaurant, updateOrderStatus);

// (Optional) Sales summary
router.get("/analytics/:restaurantId", protect, isRestaurant, getSalesAnalytics);

export default router;
