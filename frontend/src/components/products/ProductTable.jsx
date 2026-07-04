import ProductRow from "./ProductRow";

function ProductTable({
  products,
  search,
  deleteProduct,
  editProduct,
}) {
  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          ))}
      </tbody>
    </table>
  );
}

export default ProductTable;