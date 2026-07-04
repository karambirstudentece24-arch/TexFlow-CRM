import express from "express";

import {
  getOrders,
  getOrderById,
  getInvoice,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Get all orders
router.get("/", getOrders);

// Get invoice (keep this BEFORE /:id)
router.get("/:id/invoice", getInvoice);

// Get single order
router.get("/:id", getOrderById);

// Create order
router.post("/", addOrder);

// Update order
router.put("/:id", updateOrder);

// Delete order
router.delete("/:id", deleteOrder);

export default router;