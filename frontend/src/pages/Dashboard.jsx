import { useState, useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedCustomers =
      JSON.parse(localStorage.getItem("customers")) || [];

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setCustomers(savedCustomers);
    setProducts(savedProducts);
    setOrders(savedOrders);
  }, []);

  // Inventory Value
  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price) * Number(product.stock),
    0
  );

  // Revenue
  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total),
    0
  );

  // Pending Orders
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  // Low Stock
  const lowStock = products.filter(
    (product) => Number(product.stock) <= 10
  ).length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome Back 👋</h1>
          <p>Manage your textile business efficiently.</p>
        </div>
      </div>

      <div className="cards">
        <StatCard
          title="Total Customers"
          value={customers.length}
        />

        <StatCard
          title="Products"
          value={products.length}
        />

        <StatCard
          title="Total Orders"
          value={orders.length}
        />

        <StatCard
          title="Inventory Value"
          value={`₹${inventoryValue}`}
        />
      </div>

      <div className="dashboard-bottom">
        <div className="recent-orders">
          <h2>Recent Orders</h2>

          <ul>
            {orders.length === 0 ? (
              <li>No orders yet.</li>
            ) : (
              orders
                .slice(-5)
                .reverse()
                .map((order) => (
                  <li key={order.id}>
                    🛒 {order.id} - {order.product} (
                    {order.quantity})
                  </li>
                ))
            )}
          </ul>
        </div>

        <div className="quick-stats">
          <h2>Business Summary</h2>

          <div className="summary-item">
            <span>Total Revenue</span>
            <strong>₹{totalRevenue}</strong>
          </div>

          <div className="summary-item">
            <span>Pending Orders</span>
            <strong>{pendingOrders}</strong>
          </div>

          <div className="summary-item">
            <span>Low Stock Products</span>
            <strong>{lowStock}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;