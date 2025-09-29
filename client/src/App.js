import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Regi from './Regi';
import UserRegi from './Userregi';
import Login from './Login';
import AssistantDashboard from './AssistantDashboard';
import UserDashboard from './UserDashboard';
import BookingForm from './BookingForm';
import logo from './logo.svg';

function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>CareConnect</h1>
        <nav style={{ marginTop: "20px" }}>
          <Link to="/AssistantRegister" style={{ marginRight: "10px" }}>Register as Assistant</Link>
          <Link to="/UserRegister" style={{ marginRight: "10px" }}>Register as User</Link>
          <Link to="/assistantlogin" style={{ marginRight: "10px" }}>Login</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AssistantRegister" element={<Regi />} />
          <Route path="/UserRegister" element={<UserRegi />} />
          <Route path="/assistantlogin" element={<Login />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/assistantDashboard" element={<AssistantDashboard />} />
          <Route path="/booking" element={<BookingForm />} />
        </Routes>
      </main>

      <footer className="App-footer" style={{ marginTop: "50px" }}>
        <p>&copy; 2025 CareConnect. All rights reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
