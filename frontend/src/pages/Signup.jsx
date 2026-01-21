import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.agree) {
      setError("Please accept the terms");
      return;
    }

    // 🔒 Backend later
    navigate("/login");
  };

  return (
    <div className="container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="brand">
          <div className="logo">₹</div>
          <span>TaxPal</span>
        </div>

        <h2>Create Your Account</h2>
        <p>
          Join TaxPal and start managing your finances smarter and safer.
        </p>

        <ul className="bullets">
          <li>📊 Smart financial tools</li>
          <li>🔐 Secure by default</li>
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="auth-top-nav">
          <p>Already have an account?</p>
          <Link to="/login" className="btn-small">
            Sign in
          </Link>
        </div>

        <div className="form-card">
          <h2>Sign Up</h2>
          <p className="muted">Create your free account</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <div className="input">
              <span>👤</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <label>Email</label>
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
                placeholder="Create password"
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

            <label>Confirm Password</label>
            <div className="input password-wrapper">
              <span>🔐</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              <label>
                I agree to the{" "}
                <span className="link">Terms</span> &{" "}
                <span className="link">Privacy Policy</span>
              </label>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="btn primary">
              Sign up
            </button>

            <p className="muted centered">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
