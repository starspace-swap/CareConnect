import React, { useState } from "react";
import BookingForm from "./BookingForm";

function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  // 👇 assume login user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const handleBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Dashboard</h1>

      {/* Booking Form */}
      <BookingForm onBooking={handleBooking} loggedInUser={loggedInUser} />

      {/* Booking List */}
      <div className="mt-5">
        <h3 className="mb-3">My Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-muted">No bookings yet.</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Service</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.date}</td>
                  <td>{b.service}</td>
                  <td>{b.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
