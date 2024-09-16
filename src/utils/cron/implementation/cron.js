const cron = require('node-cron');
const createSquad = require('../process/createSquad')
// Programe la tarea para el 25 de diciembre de cada año a las 10:00 AM
cron.schedule('0 10 25 12 *', () => {
  console.log('Ejecutando tarea programada el 25 de diciembre a las 10:00 AM');
  createSquad('project1', enrolledData, mentorsData, projectsData);
  
});
