const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    skills: { type: [String], required: true },
    active: { type: Boolean, default: true },
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
