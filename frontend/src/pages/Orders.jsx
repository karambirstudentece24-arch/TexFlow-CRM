import { useState, useEffect } from "react";

import SearchOrder from "../components/orders/SearchOrder";
import OrderTable from "../components/orders/OrderTable";
import OrderModal from "../components/orders/OrderModal";

import {
  getOrders,
  addOrder as addOrderAPI,
  updateOrder,
  deleteOrder as deleteOrderAPI,
} from "../services/orderService";

import { getCustomers } from "../services/customerService";
import { getProducts } from "../services/productService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    product: "",
    quantity: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveOrder = async () => {
    if (
      !newOrder.customer ||
      !newOrder.product ||
      !newOrder.quantity
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await updateOrder(editingId, newOrder);
      } else {
        await addOrderAPI(newOrder);
      }

      await fetchOrders();
      await fetchProducts();

      setNewOrder({
        customer: "",
        product: "",
        quantity: "",
        status: "Pending",
      });

      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save order"
      );
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrderAPI(id);

      await fetchOrders();
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const editOrder = (order) => {
    setEditingId(order._id);

    setNewOrder({
      customer: order.customer,
      product: order.product,
      quantity: order.quantity,
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