const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courseController');

// Crear un nuevo usuario
router.post('/', coursesController.createCourse);

// Leer todos los usuarios
router.get('/', coursesController.getAllCourses);

// Leer un usuario por ID
router.get('/:id', coursesController.getCourseById);

// Actualizar un usuario por ID
router.put('/:id', coursesController.updateCourseById);

// Eliminar un usuario por ID
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
