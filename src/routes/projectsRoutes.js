const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../../multerConfig'); // Importa la configuración de multer


// Crear un nuevo usuario
router.post('/projects',upload.single('img'), projectController.createProject);

// Leer todos los usuarios
router.get('/projects', projectController.getAllProjects);

// Leer un usuario por ID
router.get('/projects/:id', projectController.getProjectById);

// Actualizar un usuario por ID
router.put('/projects/:id',upload.single('img'), projectController.updateProjectById);

// Eliminar un usuario por ID
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
