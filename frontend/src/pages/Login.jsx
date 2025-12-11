import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", form);
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      {/* LEFT BLUE PANEL */}
      <div className="left-panel">
        <div className="brand">
          <div className="logo">₹</div>
          <span>TaxPal</span>
        </div>
        
        <h2>Welcome Back to TaxPal</h2>
        <p>
          Your trusted platform for secure financial management. 
          Access your accounts, track investments and manage your portfolio with confidence.
        </p>
        
        <ul className="bullets">
          <li>🔒 Bank-level encryption</li>
          <li>⚡ Multilevel Encryption</li>
        </ul>
      </div>

      {/* RIGHT WHITE PANEL */}
      <div className="right-panel">
        <div className="auth-top-nav">
          <p>Don't have an account?</p>
          <Link to="/signup" className="btn-small">
            Sign up
          </Link>
        </div>

        <div className="form-card">
          <h2>Sign In to Your Account</h2>
          <p className="muted">
            Enter your credentials to access your financial dashboard
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label>Email address</label>
            <div className="input">
              <span>📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <label>Password</label>
            <div className="input password-wrapper">
              <span>🔐</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="eye-icon"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="row-between">
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-btn">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn primary">
              Sign in
            </button>

            <p className="muted centered">
              Don't have an account?{" "}
              <Link to="/signup" className="link">
                Sign up for free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}