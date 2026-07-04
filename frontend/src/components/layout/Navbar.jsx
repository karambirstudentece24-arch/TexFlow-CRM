import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>TexFlow CRM</h2>
      </div>

      <div className="navbar-right">
        <FaBell className="nav-icon" />

        <div className="user-info">
          <FaUserCircle className="user-avatar" />

          <div>
            <h4>{user?.name || "User"}</h4>
            <p>{user?.role || "Admin"}</p>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;