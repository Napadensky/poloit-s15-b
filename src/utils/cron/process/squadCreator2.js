
const Enrolled = require('../../../models/Enrolled');
const Squad = require('../../../models/Squad');
const Project = require('../../../models/Projects');
const Mentor = require('../../../models/Mentor');
const updateAssigned = require('./updateAssigned');
const assignRemainingStudents = require('./assignReiminded');


exports.createSquadsForProject = async (projectId) => {
  try {
  

    const mentors = await Mentor.find({ projects: projectId, assigned: false});
    if (!mentors.length) {
      throw new Error('No hay mentores inscritos en este proyecto');

    }

    const enrolledStudents = await Enrolled.find({ projects: projectId, assigned: false});
    if (!enrolledStudents.length) {
      throw new Error('No hay estudiantes inscritos en este proyecto');

    }

    console.log(enrolledStudents)

   
    const studentsByRole = {
      frontend: enrolledStudents.filter(student => student.role === 'Frontend'),
      backend: enrolledStudents.filter(student => student.role === 'Backend'),
      QA: enrolledStudents.filter(student => student.role === 'QA'),
      UXUI: enrolledStudents.filter(student => student.role === 'UX/UI')
    };

    const minSquads = Math.min(
      studentsByRole.frontend.length,
      studentsByRole.backend.length,
      studentsByRole.QA.length,
      studentsByRole.UXUI.length,
      mentors.length
    );

    if (minSquads === 0) {
      throw new Error('No hay suficientes estudiantes para formar squads completos');
    }

    const squads = [];
    //const mentors = project.mentors;
    const totalMentors = mentors.length;

    // Crear los squads
    for (let i = 0; i < minSquads; i++) {
      const mentor = mentors[i % totalMentors]; // Asignar mentor de forma cíclica

      // Obtener los estudiantes del squad
      const qaStudent = studentsByRole.QA[i];
      const uxuiStudent = studentsByRole.UXUI[i];
      const frontendStudent = studentsByRole.frontend[i];
      const backendStudent = studentsByRole.backend[i];

      // Asignar estudiantes y mentor al squad
      const squad = new Squad({
        project: projectId,
        qa: qaStudent ? [qaStudent._id] : [],
        uxui: uxuiStudent ? [uxuiStudent._id] : [],
        frontends: frontendStudent ? [frontendStudent._id] : [],
        backends: backendStudent ? [backendStudent._id] : [],
        mentor: mentor._id // Asignar mentor al squad
      });

      // Guardar el squad
      await squad.save();
      squads.push(squad);
    }

    // Llamar a la función para actualizar el campo 'assigned'
   await updateAssigned(squads);

    // Realizar una nueva consulta para verificar si quedan estudiantes no asignados
   let remainingStudents = await Enrolled.find({ projects: projectId, assigned: false });

    // Si hay estudiantes no asignados, distribuirlos en los squads ya existentes
    if (remainingStudents.length > 0) {
        await assignRemainingStudents(remainingStudents, squads);
     }

    return squads;
  } catch (error) {
    throw new Error('Error al generar squads: ' + error.message);
  }
};
