import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";

// GET All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// GET Invoice Data
export const getInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const customer = await Customer.findOne({
      name: order.customer,
    });

    res.status(200).json({
      order,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD Order
export const addOrder = async (req, res) => {
  try {
    const {
      customer,
      product,
      quantity,
      status,
    } = req.body;

    // Find Product
    const selectedProduct = await Product.findOne({
      name: product,
    });

    if (!selectedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check Stock
    if (selectedProduct.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    // Calculate prices
    const unitPrice = selectedProduct.price;
    const total = unitPrice * quantity;

    // Reduce Stock
    selectedProduct.stock -= quantity;
    await selectedProduct.save();

    // Create Order
    const order = await Order.create({
      customer,
      product,
      quantity,
      unitPrice,
      total,
      status,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Order
// UPDATE Order
export const updateOrder = async (req, res) => {
  try {
    const oldOrder = await Order.findById(req.params.id);

    if (!oldOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const product = await Product.findOne({
      name: oldOrder.product,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Restore previous stock
    product.stock += oldOrder.quantity;

    // Check new stock availability
    if (product.stock < req.body.quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    // Deduct updated quantity
    product.stock -= req.body.quantity;

    await product.save();

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        unitPrice: product.price,
        total: product.price * req.body.quantity,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE Order
export const deleteOrder = async (req, res) => {
  try {
    // Find Order
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Restore Stock
    const product = await Product.findOne({
      name: order.product,
    });

    if (product) {
      product.stock += order.quantity;
      await product.save();
    }

    // Delete Order
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};