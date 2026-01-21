import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    // 🔒 Backend later (email reset API)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="brand">
          <div className="logo">₹</div>
          <span>TaxPal</span>
        </div>

        <h2>Recover Your Account</h2>
        <p>
          Forgot your password? No worries. We’ll help you securely reset it
          and get back to managing your finances.
        </p>

        <ul className="bullets">
          <li>🔒 Secure password reset</li>
          <li>⚡ Fast email delivery</li>
          <li>🛡️ Bank-level encryption</li>
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="auth-top-nav">
          <p>Remember your password?</p>
          <Link to="/login" className="btn-small">
            Sign in
          </Link>
        </div>

        <div className="form-card">
          <h2>Reset Password</h2>
          <p className="muted">
            Enter your registered email and we’ll send you a reset link
          </p>

          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Check your email</h3>
              <p>
                A password reset link has been sent to <strong>{email}</strong>.
              </p>

              <div className="success-actions">
                <button
                  className="btn primary"
                  onClick={() => navigate("/login")}
                >
                  Back to Sign In
                </button>

                <p className="resend-text">
                  Didn’t receive it?{" "}
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
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="error-text">{error}</p>}

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
