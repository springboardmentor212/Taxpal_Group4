import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="container">
      {/* LEFT BLUE PANEL */}
      <div className="left-panel">
        <div className="brand">
          <div className="logo">₹</div>
          <span>TaxPal</span>
        </div>
        <h2>Recover Your Account</h2>
        <p>
          Secure access to your financial dashboard is just a reset away.<br />
          We'll help you regain access with bank-level security measures.
        </p>
        
        <ul className="bullets">
          <li>🔒 Secure password reset</li>
          <li>⚡ Instant email delivery</li>
          <li>🛡️ Bank-level encryption</li>
        </ul>
      </div>

      {/* RIGHT WHITE PANEL */}
      <div className="right-panel">
        <div className="auth-top-nav">
          <p>Remember your password?</p>
          <Link to="/login" className="btn-small">
            Sign in
          </Link>
        </div>

        <div className="form-card">
          <h2>Reset Your Password</h2>
          <p className="muted">
            Enter your email address and we'll send you a link to reset your password
          </p>

          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Check Your Email</h3>
              <p>
                We've sent a password reset link to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <div className="success-actions">
                <button 
                  className="btn primary" 
                  onClick={() => navigate("/login")}
                >
                  Back to Sign In
                </button>
                <p className="resend-text">
                  Didn't receive the email?{" "}
                  <button 
                    className="resend-link" 
                    onClick={() => setSubmitted(false)}
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset}>
              <label>Email address</label>
              <div className="input">
                <span>📧</span>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn primary" 
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="forgot-footer">
                <Link to="/login" className="back-link">
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}