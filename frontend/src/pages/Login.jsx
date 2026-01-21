import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 🔒 Backend later
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    // TEMP: frontend navigation only
    navigate("/dashboard");
  };

  return (
    <div className="container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="brand">
          <div className="logo">₹</div>
          <span>TaxPal</span>
        </div>

        <h2>Welcome Back to TaxPal</h2>
        <p>
          Access your financial dashboard securely and manage your money with
          confidence.
        </p>

        <ul className="bullets">
          <li>🔒 Bank-level encryption</li>
          <li>⚡ Secure & fast access</li>
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="auth-top-nav">
          <p>Don't have an account?</p>
          <Link to="/signup" className="btn-small">
            Sign up
          </Link>
        </div>

        <div className="form-card">
          <h2>Sign In</h2>
          <p className="muted">Login to continue to your dashboard</p>

          <form onSubmit={handleSubmit}>
            <label>Email address</label>
            <div className="input">
              <span>📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <label>Password</label>
            <div className="input password-wrapper">
              <span>🔐</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="row-between">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <label>Remember me</label>
              </div>

              <Link to="/forgot-password" className="forgot-btn">
                Forgot Password?
              </Link>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="btn primary">
              Sign in
            </button>

            <p className="muted centered">
              Don’t have an account?{" "}
              <Link to="/signup" className="link">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
