import { useState, useEffect } from "react";

import SearchOrder from "../components/orders/SearchOrder";
import OrderTable from "../components/orders/OrderTable";
import OrderModal from "../components/orders/OrderModal";

function Orders() {
  const defaultOrders = [];

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders
      ? JSON.parse(savedOrders)
      : defaultOrders;
  });

  const [customers] = useState(() => {
    const savedCustomers = localStorage.getItem("customers");
    return savedCustomers ? JSON.parse(savedCustomers) : [];
  });

  const [products] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    product: "",
    quantity: "",
    unitPrice: "",
    total: "",
    status: "Pending",
  });

  // Save Order
  const saveOrder = () => {
    if (
      !newOrder.customer ||
      !newOrder.product ||
      !newOrder.quantity ||
      !newOrder.unitPrice ||
      !newOrder.total
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      setOrders(
        orders.map((order) =>
          order.id === editingId
            ? { ...order, ...newOrder }
            : order
        )
      );
    } else {
      setOrders([
        ...orders,
        {
          id:
            "ORD" +
            (orders.length + 1)
              .toString()
              .padStart(3, "0"),
          ...newOrder,
        },
      ]);
    }

    setNewOrder({
      customer: "",
      product: "",
      quantity: "",
      unitPrice: "",
      total: "",
      status: "Pending",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Delete Order
  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders(
        orders.filter((order) => order.id !== id)
      );
    }
  };

  // Edit Order
  const editOrder = (order) => {
    setEditingId(order.id);

    setNewOrder({
      customer: order.customer,
      product: order.product,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
      total: order.total,
      status: order.status,
    });

    setShowForm(true);
  };

  return (
    <div className="page">
      <h1>Orders</h1>

      <SearchOrder
        search={search}
        setSearch={setSearch}
        setShowForm={setShowForm}
      />

      <OrderTable
        orders={orders}
        search={search}
        editOrder={editOrder}
        deleteOrder={deleteOrder}
      />

      <OrderModal
        showForm={showForm}
        setShowForm={setShowForm}
        newOrder={newOrder}
        setNewOrder={setNewOrder}
        saveOrder={saveOrder}
        editingId={editingId}
        customers={customers}
        products={products}
      />
    </div>
  );
}

export default Orders;