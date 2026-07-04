import { useState, useEffect } from "react";

import SearchBar from "../components/customers/SearchBar";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerModal from "../components/customers/CustomerModal";

import {
  getCustomers,
  addCustomer as addCustomerAPI,
  updateCustomer,
  deleteCustomer as deleteCustomerAPI,
} from "../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    city: "",
    gst: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCustomer = async () => {
    if (
      !newCustomer.name ||
      !newCustomer.phone ||
      !newCustomer.city ||
      !newCustomer.gst
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await updateCustomer(editingId, newCustomer);
      } else {
        await addCustomerAPI(newCustomer);
      }

      await fetchCustomers();

      setNewCustomer({
        name: "",
        phone: "",
        city: "",
        gst: "",
      });

      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCustomer = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this customer?"
      )
    )
      return;

    try {
      await deleteCustomerAPI(id);
      await fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer._id);

    setNewCustomer({
      name: customer.name,
      phone: customer.phone,
      city: customer.city,
      gst: customer.gst,
    });

    setShowForm(true);
  };

  return (
    <div className="page">
      <h1>Customers</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        setShowForm={setShowForm}
      />

      <CustomerTable
        customers={customers}
        search={search}
        deleteCustomer={deleteCustomer}
        editCustomer={editCustomer}
      />

      <CustomerModal
        showForm={showForm}
        setShowForm={setShowForm}
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
        addCustomer={addCustomer}
        editingId={editingId}
      />
    </div>
  );
}

export default Customers;