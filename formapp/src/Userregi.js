import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Make sure react-router-dom v6+ use ho raha ho

function UserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setMessage("❌ Invalid email format");
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage(
        "❌ Password must be at least 8 characters, include uppercase, lowercase, number & special character"
      );
      return;
    }

    try {
      // POST request
      const response = await axios.post("http://localhost:3001/api/users/register", formData);

      if (response.status === 201) {
        setMessage("✅ User registered successfully!");
        setFormData({ name: "", email: "", password: "", age: "" });

        // Navigate to login page
        navigate("/assistantlogin");
      } else {
        setMessage("❌ Registration failed: " + (response.data.message || ""));
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage("❌ " + error.response.data.message);
      } else {
        setMessage("❌ Server error");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>User Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <small>Password must be 8+ chars, include uppercase, lowercase, number & special character</small>
        </div>
        <div>
          <label>Age:</label><br />
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Register</button>
      </form>
    </div>
  );
}

export default UserRegister;
