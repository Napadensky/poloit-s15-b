const express = require('express');
const cors = require('cors'); // Importa cors
const app = express();
const connectDB = require('./config/db'); // Importa connectDB correctamente
const userRoutes = require('./routes/userRoutes');
const enrolledRoutes = require('./routes/enrolledRoutes');
const tagRoutes = require('./routes/tagRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const emailRoutes = require('./utils/nodeMailer/emailRoutes');
const squadRoutes = require('./routes/squadRoutes');



connectDB();

app.use(cors()); // Habilita CORS
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use('/api', userRoutes); // Rutas de usuarios
app.use('/api', enrolledRoutes); // Rutas de usuarios
app.use('/api', tagRoutes);
app.use('/api', mentorRoutes);
app.use('/api', projectsRoutes); 
app.use('/api', emailRoutes);
app.use('/api', squadRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
