const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

// Crear un nuevo usuario
router.post('/users',validateUser, userController.createUser);

// Leer todos los usuarios
router.get('/users', userController.getAllUsers);

// Leer un usuario por ID
router.get('/users/:id', userController.getUserById);

// Actualizar un usuario por ID
router.put('/users/:id', userController.updateUserById);

// Eliminar un usuario por ID
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
