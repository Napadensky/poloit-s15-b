
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: [String], required: true },
  startHour: { type: String, required: true },
  endHour: { type: String, required: true },
  duration: { type: Number, required: true },
});

// No creo el modelo aquí, solo exporta el esquema
module.exports = scheduleSchema;
