const { createSquadsForProject } = require('../utils/cron/process/squadCreator2');
const Squad = require('../models/Squad')

// Controlador para manejar la creación de squads
exports.createSquads = async (req, res) => {
  const { projectId } = req.params;
  try {
    const squads = await createSquadsForProject(projectId);
    res.status(201).json(squads);
  } catch (error) {
    console.error('Error capturado en createSquads:', error); // Mostrar el error completo
    res.status(500).json({ message: 'Error al crear squads', error: error.message });
  }
};

exports.getAllSquads = async (req, res) => {
  try {
    const squads = await Squad.find();
    res.status(200).json(squads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los squads', error });
  }
};

exports.getSquadById = async (req, res) => {
  try {
    const squad = await Squad.findById(req.params.id);
    if (!squad) {
      return res.status(404).json({ message: 'Squad no encontrado' });
    }
    res.status(200).json(squad);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el squad', error });
  }
};

exports.deleteSquad = async (req, res) => {
  try {
    const squad = await Squad.findByIdAndDelete(req.params.id);
    if (!squad) {
      return res.status(404).json({ message: 'Squad no encontrado' });
    }
    res.status(200).json({ message: 'Squad eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el squad', error });
  }
};