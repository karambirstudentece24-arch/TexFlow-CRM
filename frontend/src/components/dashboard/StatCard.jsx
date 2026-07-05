import {
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaWarehouse,
  FaRupeeSign,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

function StatCard({ title, value }) {
  let icon;

  switch (title) {
    case "Total Customers":
      icon = <FaUsers size={30} color="#2563eb" />;
      break;

    case "Products":
      icon = <FaBox size={30} color="#16a34a" />;
      break;

    case "Total Orders":
      icon = <FaShoppingCart size={30} color="#f97316" />;
      break;

    case "Inventory Value":
      icon = <FaWarehouse size={30} color="#7c3aed" />;
      break;

    case "Revenue":
      icon = <FaRupeeSign size={30} color="#22c55e" />;
      break;

    case "Pending Orders":
      icon = <FaClock size={30} color="#eab308" />;
      break;

    case "Low Stock":
      icon = (
        <FaExclamationTriangle
          size={30}
          color="#ef4444"
        />
      );
      break;

    default:
      icon = <FaBox size={30} />;
  }

  return (
    <div className="card">
      <div className="card-icon">{icon}</div>

      <h3>{title}</h3>

      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;