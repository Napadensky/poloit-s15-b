// middlewares/validateUser.js
const { body, validationResult} = require('express-validator')

const validateUser = [
  // Validar el  'name'
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser un texto')
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  // Validar el  'mail'
  body('mail')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),

  // Validar el  'phone' (opcional)
  body('phone')
    .optional()
    .isString().withMessage('El teléfono debe ser un texto')
    .isLength({ min: 10, max: 15 }).withMessage('El teléfono debe tener entre 10 y 15 caracteres'),

  // Validar el  'password'
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isString().withMessage('La contraseña debe ser un texto')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[@$!%*?&]/).withMessage('La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &)'),
  
  // Validar el campo 'active' 
  body('active')
    .optional()
    .isBoolean().withMessage('El campo activo debe ser un valor booleano'),

  // manejo los resultados de validación 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Solo extrae los mensajes de error
      const errorMessages = errors.array().map(err => err.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  }
];

module.exports = validateUser;
