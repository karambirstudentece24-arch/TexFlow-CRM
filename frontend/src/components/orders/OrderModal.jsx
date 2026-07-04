function OrderModal({
  showForm,
  setShowForm,
  newOrder,
  setNewOrder,
  saveOrder,
  editingId,
  customers = [],
  products = [],
}) {
  if (!showForm) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {editingId !== null ? "Edit Order" : "Add Order"}
        </h2>

        {/* Customer */}

        <select
          value={newOrder.customer}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              customer: e.target.value,
            })
          }
          className="search-box"
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer._id}
              value={customer.name}
            >
              {customer.name}
            </option>
          ))}
        </select>

        {/* Product */}

        <select
          value={newOrder.product}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              product: e.target.value,
            })
          }
          className="search-box"
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option
              key={product._id}
              value={product.name}
            >
              {product.name}
            </option>
          ))}
        </select>

        {/* Quantity */}

        <input
          type="number"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              quantity: Number(e.target.value),
            })
          }
        />

        {/* Status */}

        <select
          value={newOrder.status}
          onChange={(e) =>
            setNewOrder({
              ...newOrder,
              status: e.target.value,
            })
          }
          className="search-box"
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <div className="modal-buttons">
          <button
            className="save-btn"
            onClick={saveOrder}
          >
            {editingId !== null ? "Update" : "Save"}
          </button>

          <button
            className="cancel-btn"
            onClick={() => {
              setShowForm(false);

              setNewOrder({
                customer: "",
                product: "",
                quantity: "",
                status: "Pending",
              });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;