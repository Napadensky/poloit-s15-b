const express = require('express');
const { createSquads, getAllSquads, getSquadById, deleteSquad } = require('../controllers/squadController'); // Ajusta la ruta si es necesario

const router = express.Router();

// Ruta para crear squads para un proyecto específico
router.post('/projects/:projectId/squads', createSquads);
router.get('/squads', getAllSquads);
router.get('/squads/:id', getSquadById);
router.delete('/squads/:id', deleteSquad);

module.exports = router;
