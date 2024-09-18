const express = require('express');
const { createSquads } = require('../controllers/squadController'); // Ajusta la ruta si es necesario

const router = express.Router();

// Ruta para crear squads para un proyecto específico
router.post('/projects/:projectId/squads', createSquads);

module.exports = router;
