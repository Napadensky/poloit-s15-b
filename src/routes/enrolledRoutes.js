const express = require('express');
const router = express.Router();
const enrolledController = require('../controllers/enrolledController');

// 
router.post('/enrolled', enrolledController.createEnrolled);

//
router.get('/enrolled', enrolledController.getAllEnrolled);

//
router.get('/enrolled/:id', enrolledController.getEnrolledById);

// Actualizar por ID
router.put('/enrolled/:id', enrolledController.updateEnrolled);

// Eliminar  por ID
router.delete('/enrolled/:id', enrolledController.deleteEnrolled);

module.exports = router;
