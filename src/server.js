const express = require('express');
const app = express();
const connectDB = require('./config/db'); // Importa connectDB correctamente
const userRoutes = require('./routes/userRoutes');

connectDB();

app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use('/api', userRoutes); // Rutas de usuarios

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
