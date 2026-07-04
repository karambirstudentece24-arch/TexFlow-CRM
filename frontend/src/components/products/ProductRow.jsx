import { FaEdit, FaTrash } from "react-icons/fa";

function ProductRow({
  product,
  deleteProduct,
  editProduct,
}) {
  const getStatus = () => {
    if (product.stock == 0) {
      return <span className="status out">Out of Stock</span>;
    }

    if (product.stock <= 20) {
      return <span className="status low">Low Stock</span>;
    }

    return <span className="status in">In Stock</span>;
  };

  return (
    <tr>
      <td>{product.name}</td>

      <td>{product.category}</td>

      <td>₹{product.price}</td>

      <td>{product.stock}</td>

      <td>{getStatus()}</td>

      <td className="action-buttons">
        <button
          className="edit-btn"
          onClick={() => editProduct(product)}
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteProduct(product._id)}
        >
          <FaTrash />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;