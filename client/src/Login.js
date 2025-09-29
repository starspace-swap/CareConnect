import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3001/api/login-combined", { email,password });

      if(res.data.role === "user"){
        localStorage.setItem("role","user");
        localStorage.setItem("user",JSON.stringify(res.data.user));
        navigate("/userDashboard");
      }
      else if(res.data.role === "assistant"){
        localStorage.setItem("role","assistant");
        localStorage.setItem("assistant",JSON.stringify(res.data.assistant));
        navigate("/assistantDashboard");
      }
      else{
        setMessage("Login failed. Check credentials.");
      }

    } catch(err){
      setMessage(err.response?.data?.message || "Login failed. Check credentials.");
      console.error(err);
    }
  };

  return (
    <div style={{ margin:"20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><br/><br/>
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color:"red" }}>{message}</p>}
    </div>
  );
}

export default Login;
