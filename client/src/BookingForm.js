import React, { useState, useEffect } from "react";

function BookingForm({ onBooking, loggedInUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    notes: "",
  });

  useEffect(() => {
    if (loggedInUser) {
      setForm((prev) => ({
        ...prev,
        name: loggedInUser.name,
        email: loggedInUser.email,
      }));
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.service) {
      alert("Please select a service");
      return;
    }
    onBooking(form);
    setForm((prev) => ({
      ...prev,
      phone: "",
      date: "",
      service: "",
      notes: "",
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Book a Service</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={form.name}
            type="text"
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={form.email}
            type="email"
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Service</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">-- Choose Service --</option>
            <option value="Medical Assistance">Medical Assistance</option>
            <option value="Home Doctor">Home Doctor</option>
            <option value="Emergency Transport">Emergency Transport</option>
            <option value="Ambulance">Ambulance</option>
            <option value="Blood Test Pickup">Blood Test Pickup</option>
            <option value="Mental Health Counseling">Mental Health Counseling</option>
            <option value="Physiotherapy">Physiotherapy</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="form-control"
            placeholder="Any special request?"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
