import { FaEdit, FaTrash } from "react-icons/fa";

function CustomerRow({
  customer,
  deleteCustomer,
  editCustomer,
}) {
  return (
    <tr>
      <td>{customer.name}</td>

      <td>{customer.phone}</td>

      <td>{customer.city}</td>

      <td>{customer.gst}</td>

      <td className="action-buttons">
        <button
          className="edit-btn"
          onClick={() => editCustomer(customer)}
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteCustomer(customer._id)}
        >
          <FaTrash />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CustomerRow;