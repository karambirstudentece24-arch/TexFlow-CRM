function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <ul>
        <li className="active">Dashboard</li>
        <li>Customers</li>
        <li>Products</li>
        <li>Orders</li>
        <li>Inventory</li>
      </ul>
    </div>
  );
}

export default Sidebar;