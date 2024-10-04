const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/User');



const SALT = parseInt(process.env.SALT, 10);

const JWT_SECRET = process.env.JWT_SECRET;

// nuevo usuario
/**exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};**/
// registro de usuario encriptando contrase;a y generando JWT toquen

exports.createUser = async (req, res) => {
  try {
    const { name, mail, phone, password } = req.body;

     // Verificar existencia
     let user = await User.findOne({ $or: [{ name }, { mail }] });
    
     if (user) {
       return res.status(400).json({ error: 'User already exists with the provided name or email' });
     }

    // Crear un nuevo usuario
    user = new User({ name, mail, phone });

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(SALT);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generar token JWT
    const token = jwt.sign({ id: user._id, mail: user.mail }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// inicio de sesion

exports.loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Verificar si el usuario existe
    let user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id, mail: user.mail }, JWT_SECRET, { expiresIn: '1h' });

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword, // Usuario sin contraseña
      token
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//  todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario por ID
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
