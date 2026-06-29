import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaWarehouse,
} from "react-icons/fa";

function Sidebar() {
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

        <li>
          <NavLink to="/products">
            <FaBoxOpen />
            Products
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders">
            <FaShoppingCart />
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/inventory">
            <FaWarehouse />
            Inventory
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;