const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: [String], required: true },
  startHour: { type: String, required: true },
  endHour: { type: String, required: true },
  duration: { type: Number, required: true },
});

const courseSchema = new mongoose.Schema({
  active: { type: Boolean, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  modalidad: { type: String, required: true },
  plataforma: { type: String, required: true },
  precio: { type: Number, required: true },
  schedules: { type: [scheduleSchema], required: true }, // Array para múltiples horarios
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  title: { type: String, required: true }, 
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
