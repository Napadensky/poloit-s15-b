const Mentor = require('../models/Mentor');

// Crear 
exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos 
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un mentor por ID
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un mentor por ID
exports.updateMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.status(200).json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar por ID
exports.deleteMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.status(200).json({ message: 'Mentor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
