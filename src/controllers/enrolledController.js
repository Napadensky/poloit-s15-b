const Enrolled = require('../models/Enrolled');

// Crear un nuevo estudiante
exports.createEnrolled = async (req, res) => {
  try {
    const enrolled = new Enrolled(req.body);
    await enrolled.save();
    res.status(201).json(enrolled);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el inscripto', error });
  }
};

// Obtener todos los estudiantes
exports.getAllEnrolled = async (req, res) => {
  try {
    const enrolled = await Enrolled.find();
    res.status(200).json(enrolled);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estudiantes', error });
  }
};

// Obtener un estudiante por ID
exports.getEnrolledById = async (req, res) => {
  try {
    const enrolled = await Enrolled.findById(req.params.id);
    if (!enrolled) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json(enrolled);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el estudiante', error });
  }
};

// Actualizar un estudiante
exports.updateEnrolled = async (req, res) => {
  try {
    const enrolled = await Enrolled.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!enrolled) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json(enrolled);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el estudiante', error });
  }
};

// Eliminar un estudiante
exports.deleteEnrolled = async (req, res) => {
  try {
    const enrolled = await Enrolled.findByIdAndDelete(req.params.id);
    if (!enrolled) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el estudiante', error });
  }
};
