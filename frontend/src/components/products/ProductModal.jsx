function ProductModal({
  showForm,
  setShowForm,
  newProduct,
  setNewProduct,
  saveProduct,
  editingId,
}) {
  if (!showForm) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {editingId !== null
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              stock: e.target.value,
            })
          }
        />

        <div className="modal-buttons">
          <button
            className="save-btn"
            onClick={saveProduct}
          >
            {editingId !== null ? "Update" : "Save"}
          </button>

          <button
            className="cancel-btn"
            onClick={() => {
              setShowForm(false);

              setNewProduct({
                name: "",
                category: "",
                price: "",
                stock: "",
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

export default ProductModal;