import { useState, useEffect } from "react";
import axios from "axios";

function SalesReports() {
  const [stats, setStats] = useState({
    revenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchTopProducts();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/dashboard"
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/dashboard/top-products"
      );

      setTopProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Sales Reports</h1>

      <div className="cards">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <h2>₹{stats.revenue}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending Orders</h3>
          <h2>{stats.pendingOrders}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed Orders</h3>
          <h2>{stats.totalOrders - stats.pendingOrders}</h2>
        </div>
      </div>

      <div
        className="recent-orders"
        style={{ marginTop: "30px" }}
      >
        <h2>Top Selling Products</h2>

        <table className="customer-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Units Sold</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.length === 0 ? (
              <tr>
                <td colSpan="2">
                  No sales available
                </td>
              </tr>
            ) : (
              topProducts.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesReports;