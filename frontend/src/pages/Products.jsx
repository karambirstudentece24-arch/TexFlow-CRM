import { useState, useEffect } from "react";

import SearchProduct from "../components/products/SearchProduct";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";

function Products() {
  const defaultProducts = [
    {
      id: 1,
      name: "Cotton Fabric",
      category: "Fabric",
      price: 250,
      stock: 45,
    },
    {
      id: 2,
      name: "Silk Saree",
      category: "Garments",
      price: 1800,
      stock: 12,
    },
    {
      id: 3,
      name: "Denim Jeans",
      category: "Garments",
      price: 1200,
      stock: 28,
    },
  ];

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const saveProduct = () => {
    if (
      newProduct.name === "" ||
      newProduct.category === "" ||
      newProduct.price === "" ||
      newProduct.stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      setProducts(
        products.map((product) =>
          product.id === editingId
            ? { ...product, ...newProduct }
            : product
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...newProduct,
        },
      ]);
    }

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setEditingId(null);

    setShowForm(false);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(
        products.filter((product) => product.id !== id)
      );
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);

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