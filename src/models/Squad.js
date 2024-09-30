const mongoose = require('mongoose');

const squadSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  qa: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrolled' }],
  uxui: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrolled' }],
  frontends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrolled' }],
  backends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrolled' }],
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
});

const Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;
