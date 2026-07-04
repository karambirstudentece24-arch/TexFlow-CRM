import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";

// Dashboard Cards
export const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const products = await Product.find();

    const inventoryValue = products.reduce(
      (sum, product) =>
        sum + Number(product.price) * Number(product.stock),
      0
    );

    const revenue = (
      await Order.find()
    ).reduce(
      (sum, order) => sum + Number(order.total),
      0
    );

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const lowStockProducts = await Product.countDocuments({
      stock: { $lte: 10 },
    });

    res.json({
      totalCustomers,
      totalProducts,
      totalOrders,
      inventoryValue,
      revenue,
      pendingOrders,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Monthly Revenue Analytics
export const getAnalytics = async (req, res) => {
  try {
    const orders = await Order.find();

    const monthlyRevenue = [
      { month: "Jan", revenue: 0 },
      { month: "Feb", revenue: 0 },
      { month: "Mar", revenue: 0 },
      { month: "Apr", revenue: 0 },
      { month: "May", revenue: 0 },
      { month: "Jun", revenue: 0 },
      { month: "Jul", revenue: 0 },
      { month: "Aug", revenue: 0 },
      { month: "Sep", revenue: 0 },
      { month: "Oct", revenue: 0 },
      { month: "Nov", revenue: 0 },
      { month: "Dec", revenue: 0 },
    ];

    orders.forEach((order) => {
      const monthIndex = new Date(order.createdAt).getMonth();

      monthlyRevenue[monthIndex].revenue += Number(order.total);
    });

    res.json({
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Top Selling Products
export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $group: {
          _id: "$product",
          quantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: {
          quantity: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          product: "$_id",
          quantity: 1,
        },
      },
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};