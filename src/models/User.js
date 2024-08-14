const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  phone: { type: String },
  active: { type: Boolean, default: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
