const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },       
    dni: { type: String, required: true },        
    mail: { type: String, required: true },       
    phone: { type: String, required: true },      
    role: { type: String, enum: ['Mentor'], required: true },
    projects: { type: String, required: true },   
    ong: { type: String, required: true },        
    skills: { type: [String], required: true },   
    active: { type: Boolean, default: true },     
    assigned: { type: Boolean, default: false }
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
