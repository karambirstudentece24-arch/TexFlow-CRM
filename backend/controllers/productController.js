import Product from "../models/Product.js";

// GET All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("GET Products Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("GET Product Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD Product
export const addProduct = async (req, res) => {
  try {
    console.log("Incoming Product:", req.body);

    const { name, category, price, stock } = req.body;

    if (!name || !category || price === "" || stock === "") {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }

    const product = await Product.create({
      name,
      category,
      price,
      stock,
    });

    console.log("Product Saved:", product);

    res.status(201).json(product);
  } catch (error) {
    console.error("ADD Product Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("UPDATE Product Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error("DELETE Product Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};