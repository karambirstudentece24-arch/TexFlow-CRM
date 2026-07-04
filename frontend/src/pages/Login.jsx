import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const data = await login({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login Successful 🎉");

      navigate("/");
    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Login Failed"
);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={loginUser}>
        <div className="auth-logo">
          <h1>TexFlow CRM</h1>
          <p>Textile Business Management System</p>
        </div>

        <h2>Welcome Back</h2>

        <div className="input-group">
          <FaEnvelope />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <div className="input-group" style={{ position: "relative" }}>
          <FaLock />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
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

        <button className="auth-btn" type="submit">
          Login
        </button>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;