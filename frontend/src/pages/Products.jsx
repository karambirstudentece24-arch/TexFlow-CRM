import { useState, useEffect } from "react";

import SearchProduct from "../components/products/SearchProduct";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct as deleteProductAPI,
} from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProduct = async () => {
    if (
      newProduct.name === "" ||
      newProduct.category === "" ||
      newProduct.price === "" ||
      newProduct.stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await updateProduct(editingId, newProduct);
      } else {
        await addProduct(newProduct);
      }

      await fetchProducts();

      setNewProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
      });

      setEditingId(null);

      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProductAPI(id);
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });

    setShowForm(true);
  };

  return (
    <div className="page">
      <h1>Products</h1>

      <SearchProduct
        search={search}
        setSearch={setSearch}
        setShowForm={setShowForm}
      />

      <ProductTable
        products={products}
        search={search}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />

      <ProductModal
        showForm={showForm}
        setShowForm={setShowForm}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        saveProduct={saveProduct}
        editingId={editingId}
      />
    </div>
  );
}

export default Products;