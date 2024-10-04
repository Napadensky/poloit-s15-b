const mongoose = require('mongoose');

const enrolledSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dni: { type: String, required: true },
  mail: { type: String, required: true },
  phone: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
  role: { type: String, enum: ['QA', 'UX/UI', 'Frontend', 'Backend'], required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // Campo para asociar los cursos
  assigned: { type: Boolean, default: false },
  ong:{ type: String, required: true },
  link:{ type: String, required: true },
});

const Enrolled = mongoose.model('Enrolled', enrolledSchema);

module.exports = Enrolled;
