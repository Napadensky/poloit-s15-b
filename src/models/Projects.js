const mongoose = require('mongoose');
const Schedule = require('./Schedule');


const projectSchema = new mongoose.Schema({
  active: { type: Boolean, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }], // 
  modalidad: { type: String, required: true },
  plataforma: { type: String, required: true },
  precio: { type: Number, required: true },
  schedules: { type: [Schedule], required: true }, // Array para múltiples horarios
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrolled' }],
  tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  title: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

