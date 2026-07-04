import "./App.css";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Invoice from "./pages/Invoice";
import SalesReports from "./pages/SalesReports";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const authPages =
    location.pathname === "/login" ||
    location.pathname === "/register";

  if (authPages) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <Navbar />

      <div className="main-container">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <RoleProtectedRoute
                  allowedRoles={["Admin", "Manager"]}
                >
                  <Products />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/inventory"
              element={
                <RoleProtectedRoute
                  allowedRoles={["Admin", "Manager"]}
                >
                  <Inventory />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/invoice/:id"
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sales-reports"
              element={
                <RoleProtectedRoute
                  allowedRoles={["Admin"]}
                >
                  <SalesReports />
                </RoleProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;