const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    skills: { type: [String], required: true },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ['Mentor'], required: true },
    assigned: { type: Boolean, default: false }  // Campo para marcar si ya está asignado a un squad

});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
