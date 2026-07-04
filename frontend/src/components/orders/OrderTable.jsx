import OrderRow from "./OrderRow";

function OrderTable({
  orders,
  search,
  editOrder,
  deleteOrder,
}) {
  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders
          .filter((order) =>
            order.customer
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              editOrder={editOrder}
              deleteOrder={deleteOrder}
            />
          ))}
      </tbody>
    </table>
  );
}

export default OrderTable;