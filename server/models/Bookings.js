const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: String,
  assistantId: { type: mongoose.Schema.Types.ObjectId, ref: "Assistant" },
  date: String
});

module.exports = mongoose.model('Booking', BookingSchema);
