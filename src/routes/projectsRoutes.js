const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Crear un nuevo usuario
router.post('/projects', projectController.createProject);

// Leer todos los usuarios
router.get('/projects', projectController.getAllProjects);

// Leer un usuario por ID
router.get('/projects/:id', projectController.getProjectById);

// Actualizar un usuario por ID
router.put('/projects/:id', projectController.updateProjectById);

// Eliminar un usuario por ID
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
