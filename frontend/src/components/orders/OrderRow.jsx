import { FaEdit, FaTrash } from "react-icons/fa";

function OrderRow({
  order,
  editOrder,
  deleteOrder,
}) {
  const getStatus = () => {
    switch (order.status) {
      case "Completed":
        return <span className="status in">Completed</span>;

      case "Pending":
        return <span className="status low">Pending</span>;

      case "Cancelled":
        return <span className="status out">Cancelled</span>;

      default:
        return (
          <span className="status low">
            {order.status}
          </span>
        );
    }
  };

  return (
    <tr>
      <td>{order.id}</td>

      <td>{order.customer}</td>

      <td>{order.product}</td>

      <td>{order.quantity}</td>

      <td>₹{order.unitPrice}</td>

      <td>₹{order.total}</td>

      <td>{getStatus()}</td>

      <td className="action-buttons">
        <button
          className="edit-btn"
          onClick={() => editOrder(order)}
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteOrder(order.id)}
        >
          <FaTrash />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default OrderRow;