import StatCard from "../components/dashboard/StatCard";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome Back 👋</h1>
          <p>Manage your textile business efficiently.</p>
        </div>
      </div>

      <div className="cards">
        <StatCard title="Total Customers" value="3" />
        <StatCard title="Products" value="3" />
        <StatCard title="Total Orders" value="0" />
        <StatCard title="Inventory Value" value="₹0" />
      </div>

      <div className="dashboard-bottom">
        <div className="recent-orders">
          <h2>Recent Activity</h2>

          <ul>
            <li>✅ Customer "ABC Textiles" added.</li>
            <li>📦 Product "Cotton Fabric" updated.</li>
            <li>🛒 Order module coming soon...</li>
          </ul>
        </div>

        <div className="quick-stats">
          <h2>Business Summary</h2>

          <div className="summary-item">
            <span>Total Revenue</span>
            <strong>₹0</strong>
          </div>

          <div className="summary-item">
            <span>Pending Orders</span>
            <strong>0</strong>
          </div>

          <div className="summary-item">
            <span>Low Stock Products</span>
            <strong>1</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;