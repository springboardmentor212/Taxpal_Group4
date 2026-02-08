import "./Login.css";
import graph from "./assets/206344983-financial-planning-and-management-illustration-vector-set-professional-finance-management-visual.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all the details");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      if (!res.ok) {
        setError("Login failed. Please check your credentials.");
        return;
      }
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again later.");
    }
  };
  return (
    <div className="main-Login-page">
      <div className="left-box">
        <img src={graph} alt="graph" />
        <h1>Your Finances, One Login Away..</h1>
      </div>
      <div className="login-class">
        <h2>Login To Your Account</h2>
        <br></br>
        <form onSubmit={handleLogin} noValidate>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
          <div className="input-box">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="white-input"/>
          </div>
          <div className="input-box">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="white-input"/>
          </div>
          <button id="button-id" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;