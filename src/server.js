const express = require('express');
const app = express();
const connectDB = require('./config/db'); // Importa connectDB correctamente
const userRoutes = require('./routes/userRoutes');
const tagRoutes = require('./routes/tagRoutes')

connectDB();

app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use('/api', userRoutes); // Rutas de usuarios
app.use('/api', tagRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
