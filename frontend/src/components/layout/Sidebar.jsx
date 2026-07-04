import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaWarehouse,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role || "Sales Executive";

  return (
    <div className="sidebar">
      <h2>TexFlow</h2>

      <ul>
        <li>
          <NavLink to="/" end>
            <FaTachometerAlt />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/customers">
            <FaUsers />
            Customers
          </NavLink>
        </li>

        {(role === "Admin" || role === "Manager") && (
          <li>
            <NavLink to="/products">
              <FaBoxOpen />
              Products
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/orders">
            <FaShoppingCart />
            Orders
          </NavLink>
        </li>

        {(role === "Admin" || role === "Manager") && (
          <li>
            <NavLink to="/inventory">
              <FaWarehouse />
              Inventory
            </NavLink>
          </li>
        )}

        {role === "Admin" && (
          <li>
            <NavLink to="/sales-reports">
              <FaChartBar />
              Sales Reports
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;