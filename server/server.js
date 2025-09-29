const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/assistanceBooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Booking schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    service: String
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes
app.get('/bookings', async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

app.post('/bookings', async (req, res) => {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json({ message: "Booking successful!" });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
