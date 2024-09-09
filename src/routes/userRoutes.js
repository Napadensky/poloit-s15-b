const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');


// Crear un nuevo usuario
router.post('/users', userController.createUser);

router.post('/login', userController.loginUser);

// Ruta protegida ejemplo
router.get('/protected', verifyToken, userController.getAllUsers);


// Leer todos los usuarios
router.get('/users', userController.getAllUsers);

// Leer un usuario por ID
router.get('/users/:id', userController.getUserById);

// Actualizar un usuario por ID
router.put('/users/:id', userController.updateUserById);

// Eliminar un usuario por ID
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
