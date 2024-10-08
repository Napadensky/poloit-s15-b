const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname, 'src', 'uploads')); // Carpeta imágenes
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombra el archivo con la fecha actual y el nombre original
  },
});

// Filtros para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Tipos de archivo permitidos
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Se permiten solo imágenes (jpeg, jpg, png)');
};

// Crear el middleware de Multer
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // Tamaño máximo de archivo: 1 MB
  fileFilter,
});

module.exports = upload;
