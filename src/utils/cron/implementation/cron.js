const cron = require('node-cron');
const axios = require('axios');

// URL del endpoint a ejecutar periódicamente
const URL = 'http://localhost:5001/projects/:projectId/squads'; 

// Reemplaza ':projectId' con el ID de tu proyecto real en la URL
const projectId = 'ID_DEL_PROYECTO'; 
const endpoint = URL.replace(':projectId', projectId);

// Configuracion el cron job
cron.schedule('0 10 25 12 *', async () => {
  try {
    console.log(`Iniciando la creación de squads para el proyecto: ${projectId}`);
    
    const response = await axios.post(endpoint);
    
    console.log('Squads creados con éxito:', response.data);
  } catch (error) {
    console.error('Error al crear squads:', error.message);
  }
});

/**const cron = require('node-cron');
const createSquad = require('../process/createSquad')
// Programe la tarea para el 25 de diciembre de cada año a las 10:00 AM
cron.schedule('0 10 25 12 *', () => {
  console.log('Ejecutando tarea programada el 25 de diciembre a las 10:00 AM');
  createSquad('project1', enrolledData, mentorsData, projectsData);
  
});

**/