const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  // Obtiene el token del encabezado 'Authorization' 
  const token = req.header('Authorization')?.split(' ')[1];

  // Verifica si el token existe en la solicitud
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verifica el token utilizando la clave secreta y decodifica el contenido del token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Añade el decodificado del token al objeto de solicitud 
    req.user = decoded;
    // Llama al siguiente middleware--  este caso no hay pero bueno capaz luego alla
    next();
  } catch (err) {
    // Si el token no es válido o hay algún error al verificarlo, responde con un estado 400 (Bad Request) y un mensaje de error
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
