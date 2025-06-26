import express from "express";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../Controller/menuController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// All routes protected by JWT
router.post("/:restaurantId", protect, createMenuItem);
router.get("/:restaurantId", protect, getMenuItems);
router.put("/:itemId", protect, updateMenuItem);
router.delete("/:itemId", protect, deleteMenuItem);

export default router;
