import "./Signup.css";
import {useState} from "react";
import graph from "./assets/cd0e5e48-a022-4c1a-a49a-b496cb6cda96.png";
import googleLogo from "./assets/Google__G__logo.svg.png";
function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, country, income } = e.target;
    if (!name.value || !email.value || !password.value || !country.value || !income.value) {
      setError("Please fill all the fields to continue");
      return;
    }
    if(!name.value){
      setError("Name is not Filled");
      return;
    }
    if(!email.value){
      setError("Email is not filled");
      return;
    }
    if(!password.value){
      setError("Password is not filled");
      return;
    }
    if(!country.value){
      setError("Country is not filled");
      return;
    }
    if(!income.value){
      setError("Income is not filled");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          country: country.value,
          income: income.value,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to create account");
        return;
      }
      setSuccess("Account created successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } 
    catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Try again later.");
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="hero-image">
          <img src={graph} alt="TaxPal Illustration" />
        </div>
      <div className="hero-text">
        <h1>Your Finances, One Login Away..</h1>
      </div>
    </div>
      <div className="signup-right">
        <div className="signup-card">
          <h2>Continue Your Journey With TaxPal</h2>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
          <br></br>
          <form onSubmit={handleSignup} noValidate>
            <div className="form-group">
              <label><b>Full Name</b></label>
              <br></br>
              <input placeholder="Enter name" type="text" name="name" onChange={() => setError("")}/>
            </div>
            <div className="form-group">
              <label><b>Email Address</b></label>
              <br></br>
              <input placeholder ="Enter email" type="email" name="email" onChange={() => setError("")}/>
            </div>
            <div className="form-group">
              <label><b>Password</b></label>
              <br></br>
              <input placeholder="Enter Password" type="password" name="password" onChange={() => setError("")}/>
            </div>
            <div className="form-group">
              <label><b>Country</b></label>
              <br></br>
              <input placeholder="Enter your country" type="text" name="country" onChange={() => setError("")}/>
            </div>
            <div className="form-group">
              <label><b>Monthly Income</b></label>
              <br></br>
              <input placeholder="Enter your income" type="text" name="income" onChange={() => setError("")}/>
            </div>
            <div className="terms">
              <input type="checkbox" required />
              <span>I agree to the <b>Terms</b> & <b>Conditions</b></span>
            </div>
            <button type="submit" className="primary-btn">Create Account</button>
          </form>
          <div className="divider">
            <p className="auth-login-class">OR</p>
          </div>
          <div className="oauth-buttons">
            <button type="button" id="google-button" onClick={() =>(window.location.href = "http://localhost:3000/auth/google")}>
              <img src={googleLogo} alt="Google" className="google-icon" /> Google
            </button>
            <button type="button" id="github-button" onClick={() =>(window.location.href = "http://localhost:3000/auth/github")}>
              <i className="fa-brands fa-github"></i> GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;