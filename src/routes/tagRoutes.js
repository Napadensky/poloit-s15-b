const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Crear un nuevo tag
router.post('/tags', tagController.createTag);

// Obtener todos los tags
router.get('/tags', tagController.getAllTags);

// Obtener un tag por ID
router.get('/tags/:id', tagController.getTagById);

// Actualizar un tag
router.put('/tags/:id', tagController.updateTag);

// Eliminar un tag
router.delete('/tags/:id', tagController.deleteTag);

module.exports = router;
