const express = require('express');
const app = express();
const connectDB = require('./config/db'); // Importa connectDB correctamente
const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes')
const coursesRoutes = require('./routes/coursesRoutes');

connectDB();

app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use('/api', userRoutes); // Rutas de usuarios
app.use('/api', mentorRoutes);
app.use('/api/courses', coursesRoutes); //Rutas Cursos

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
