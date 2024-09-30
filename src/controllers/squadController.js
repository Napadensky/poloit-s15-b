const { createSquadsForProject } = require('../utils/cron/process/squadCreator2');

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

