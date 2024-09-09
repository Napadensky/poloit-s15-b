const mongoose = require('mongoose');

const enrolledSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  phone: { type: String, required: true },
  active: { type: Boolean, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // Campo para asociar los cursos
});

const Enrolled = mongoose.model('Enrolled', enrolledSchema);

module.exports = Enrolled;
