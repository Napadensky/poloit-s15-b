const express = require('express');
const app = express();
const connectDB = require('./config/db'); // Importa connectDB correctamente
const userRoutes = require('./routes/userRoutes');
const enrolledRoutes = require('./routes/enrolledRoutes');

const tagRoutes = require('./routes/tagRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const emailRoutes = require('./utils/nodeMailer/emailRoutes');


connectDB();

app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use('/api', userRoutes); // Rutas de usuarios
app.use('/api', enrolledRoutes); // Rutas de usuarios
app.use('/api', tagRoutes);
app.use('/api', mentorRoutes);
app.use('/api/courses', coursesRoutes); //Rutas Cursos
app.use('/api', emailRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
