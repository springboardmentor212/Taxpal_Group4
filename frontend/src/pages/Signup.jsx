import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Check if terms are agreed
    if (!form.agree) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    console.log("Signup form submitted:", form);
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container">
      {/* LEFT BLUE PANEL */}
      <div className="left-panel">
        <div className="brand">
          <div className="logo">₹</div>
          <span>TaxPal</span>
        </div>
        
        <h2>Join TaxPal Today</h2>
        <p>
          Start your journey to better financial management.<br />
          Get access to powerful tools to track, analyze, and grow your wealth securely.
        </p>
        
        <ul className="bullets">
          <li>🔒 Bank-level encryption</li>
          <li>⚡ Lightning Fast Set Up</li>
          <li>📈 Real-time Investment Tracking</li>
        </ul>
      </div>

      {/* RIGHT WHITE PANEL */}
      <div className="right-panel">
        <div className="auth-top-nav">
          <p>Already have an account?</p>
          <Link to="/login" className="btn-small">
            Sign in
          </Link>
        </div>

        <div className="form-card">
          <h2>Create your account</h2>
          <p className="muted">Get started with secure financial management</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <label>Full Name</label>
            <div className="input">
              <span>👤</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <label>Email address</label>
            <div className="input">
              <span>📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
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
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
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

            {/* Confirm Password */}
            <label>Confirm Password</label>
            <div className="input password-wrapper">
              <span>🔐</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
              <button 
                type="button" 
                className="eye-icon"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Password strength indicator */}
            {form.password && (
              <div className="password-strength">
                <div className={`strength-bar ${form.password.length >= 8 ? 'strong' : form.password.length >= 6 ? 'medium' : 'weak'}`}></div>
                <span className="strength-text">
                  {form.password.length >= 8 ? 'Strong password' : 
                   form.password.length >= 6 ? 'Medium strength' : 
                   'Weak password'}
                </span>
              </div>
            )}

            {/* Password match indicator */}
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="error-text">Passwords do not match</p>
            )}

            {/* Terms Checkbox */}
            <div className="checkbox">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
              />
              <label htmlFor="agree">
                I agree to the{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn primary"
              disabled={!form.agree || !form.name || !form.email || !form.password || !form.confirmPassword || form.password !== form.confirmPassword}
            >
              Sign up
            </button>

            <p className="muted centered">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}