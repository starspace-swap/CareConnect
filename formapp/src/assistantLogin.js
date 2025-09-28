import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false); // ✅ toggle state
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "12345") {
      alert("Login Successful ✅");
      navigate("/home");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  // ✅ Forgot password handler
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("⚠️ Please enter your email.");
      return;
    }
    if (email === "admin@gmail.com") {
      setMessage("✅ Reset link sent to your email.");
    } else {
      setMessage("❌ Email not found in system.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form
        onSubmit={showForgot ? handleForgotPassword : handleLogin}
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          {showForgot ? "Forgot Password" : "Login"}
        </h2>

        {/* ✅ Email Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>

        {/* ✅ Password field only in Login form */}
        {!showForgot && (
          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>
        )}

        {/* ✅ Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showForgot ? "Send Reset Link" : "Login"}
        </button>

        {/* ✅ Message display */}
        {message && (
          <p style={{ marginTop: "15px", textAlign: "center" }}>{message}</p>
        )}

        {/* ✅ Toggle between Login and Forgot Password */}
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          {showForgot ? (
            <span
              onClick={() => {
                setShowForgot(false);
                setMessage("");
              }}
              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
              ← Back to Login
            </span>
          ) : (
            <span
              onClick={() => {
                setShowForgot(true);
                setMessage("");
              }}
              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
              Forgot Password?
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
