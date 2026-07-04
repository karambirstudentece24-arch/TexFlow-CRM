import express from "express";

import {
  getDashboardStats,
  getAnalytics,
  getTopProducts,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardStats);
router.get("/analytics", getAnalytics);
router.get("/top-products", getTopProducts);

export default router;