import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTie,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { register } from "../services/authService";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Sales Executive",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const data = await register(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Registration Successful 🎉");

      navigate("/");
    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Registration Failed"
);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={registerUser}>
        <div className="auth-logo">
          <h1>TexFlow CRM</h1>
          <p>Textile Business Management System</p>
        </div>

        <h2>Create Account</h2>

        <div className="input-group">
          <FaUser />

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            required
          />
        </div>

        <div
          className="input-group"
          style={{ position: "relative" }}
        >
          <FaLock />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            required
          />

          <span
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              cursor: "pointer",
              color: "#94a3b8",
            }}
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>
        </div>

        <div className="input-group">
          <FaUserTie />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Sales Executive</option>
          </select>
        </div>

        <button className="auth-btn">
          Create Account
        </button>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;