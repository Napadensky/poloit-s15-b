const cron = require('node-cron');
const Project = require('../../../models/Projects'); 
const { createSquads } = require('../.././/controllers/squadController');

cron.schedule('0 24 5 12 *', async () => {
  try {
    console.log('Iniciando la búsqueda del proyecto cuyo startDate sea una semana después de la fecha programada para la ejecución del cron.');

    // Fecha de ejecución del cron: 
    const executionDate = new Date(new Date().getFullYear(), 11, 5, 10, 0, 0); // 11 es diciembre (los meses son 0-indexados)

    // Calcula la fecha una semana después de la fecha de ejecución del cron
    const targetDate = new Date(executionDate);
    targetDate.setDate(targetDate.getDate() + 7); // Sumo 7 días a la fecha de ejecución del cron

    // Encuentra el proyecto cuyo startDate sea igual a targetDate
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const project = await Project.findOne({ 
      startDate: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!project) {
      console.log('No se encontró ningún proyecto con la fecha de inicio especificada.');
      return;
    }

    console.log(`Proyecto encontrado: ${project.title}, ID: ${project._id}`);

    // Llama a la función createSquads con el ID del proyecto encontrado
    const response = await createSquads(project._id);
    
    console.log('Squads creados con éxito:', response);
  } catch (error) {
    console.error('Error al crear squads:', error.message);
  }
});
