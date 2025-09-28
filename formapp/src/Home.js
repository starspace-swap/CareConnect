import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
    

      <main style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Welcome to CareConnect!</h2>
        <p>Use the navigation to register, login, or access your dashboard.</p>
      </main>

      
    </div>
  );
}

export default Home;
