const mongoose = require('mongoose');

const AssistantSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  service: String
});

module.exports = mongoose.model('Assistant', AssistantSchema);
