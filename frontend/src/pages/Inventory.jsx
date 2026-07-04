import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

function Inventory() {
  const [products, setProducts] = useState([]);

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

  const getStatus = (stock) => {
    if (stock === 0)
      return <span className="status out">Out of Stock</span>;

    if (stock <= 10)
      return <span className="status low">Low Stock</span>;

    return <span className="status in">In Stock</span>;
  };

  return (
    <div className="page">
      <h1>Inventory</h1>

      <table className="customer-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Unit Price</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>{getStatus(Number(product.stock))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;