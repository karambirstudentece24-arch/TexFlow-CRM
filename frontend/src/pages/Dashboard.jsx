import { useState, useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import TopProductsChart from "../components/dashboard/TopProductsChart";

import {
  getDashboardStats,
  getTopProducts,
} from "../services/dashboardService";

import { getOrders } from "../services/orderService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    inventoryValue: 0,
    revenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
  });

  const [orders, setOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchOrders();
    fetchTopProducts();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const data = await getTopProducts();
      setTopProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome Back 👋</h1>
          <p>Manage your textile business efficiently.</p>
        </div>
      </div>

      {/* Dashboard Cards */}

      <div className="cards">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
        />

        <StatCard
          title="Products"
          value={stats.totalProducts}
        />

        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
        />

        <StatCard
          title="Inventory Value"
          value={`₹${stats.inventoryValue}`}
        />
      </div>

      {/* Revenue Chart */}

      <div style={{ marginTop: "25px" }}>
        <RevenueChart orders={orders} />
      </div>

      {/* Bottom Section */}

      <div className="dashboard-bottom">
        {/* Recent Orders */}

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
                  <li key={order._id}>
                    🛒 {order.customer} ordered{" "}
                    <strong>{order.product}</strong> (
                    {order.quantity})
                  </li>
                ))
            )}
          </ul>
        </div>

        {/* Business Summary */}

        <div className="quick-stats">
          <h2>Business Summary</h2>

          <div className="summary-item">
            <span>Total Revenue</span>
            <strong>₹{stats.revenue}</strong>
          </div>

          <div className="summary-item">
            <span>Pending Orders</span>
            <strong>{stats.pendingOrders}</strong>
          </div>

          <div className="summary-item">
            <span>Low Stock Products</span>
            <strong>{stats.lowStockProducts}</strong>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}

      <div style={{ marginTop: "25px" }}>
        <TopProductsChart products={topProducts} />
      </div>
    </div>
  );
}

export default Dashboard;