const Project = require('../models/Projects');


// Crear un nuevo curso
/*exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el proyecto', error });
  }
};*/

/*exports.createProject = async (req, res) => {
  try {
    // Crea un nuevo proyecto
    const projectData = {
      ...req.body, // Incluye todos los datos enviados
      img: req.file.path, // Asigna la ruta de la imagen cargada
    };

    const project = new Project(projectData);
    console.log('Datos del proyecto:', projectData);

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el proyecto', error });
  }
  
};*/

/*exports.createProject = async (req, res) => {
  try {
    const { 
      active, 
      description, 
      maxStudents, 
      mentors, 
      modalidad, 
      plataforma, 
      precio, 
      schedules, 
      students, 
      tag, 
      title, 
      img 
    } = req.body;

    // Asegúrate de que los tipos de datos sean correctos
    const projectData = {
      active: active === 'true', // Convertir string a booleano
      description,
      maxStudents: Number(maxStudents), // Convertir string a número
      mentors: Array.isArray(mentors) ? mentors : [mentors], // Asegurarse de que sea un array
      modalidad,
      plataforma,
      precio: Number(precio), // Convertir string a número
      schedules: JSON.parse(schedules), // Parsear el string JSON a objeto
      students: Array.isArray(students) ? students : [students], // Asegurarse de que sea un array
      tag: Array.isArray(tag) ? tag : [tag], // Asegurarse de que sea un array
      title,
      img
    };
    console.log(req.body)

    const newProject = new Project(projectData);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error al crear el proyecto', error });
  }
};*/

 exports.createProject = async (req, res) => {
  const { active, description, maxStudents, mentors, modalidad, plataforma, precio, schedules, students, tag, title } = req.body;

  const newProject = new Project({
      active,
      description,
      maxStudents,
      mentors,
      modalidad,
      plataforma,
      precio,
      schedules: JSON.parse(schedules), // Lo convierto a un obj
      students,
      tag,
      title,
      img: req.file.path, // Almacena la ruta del archivo
  });

  try {
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
  } catch (error) {
      res.status(400).json({ message: "Error al crear el proyecto", error });
  }
};

// Obtener todos los cursos
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos', error });
  }
};

// Obtener un curso por ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project no encontrado' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proyecto', error });
  }
};

// Actualizar un usuario por ID
exports.updateProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un curso
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message:'Proyecto no encontrado' });
    }
    res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proyecto', error });
  }
};
