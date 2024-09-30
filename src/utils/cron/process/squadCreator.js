
const Enrolled = require('../../../models/Enrolled');
const Squad = require('../../../models/Squad');
const Project = require('../../../models/Projects');
const Mentor = require('../../../models/Mentor');


exports.createSquadsForProject = async (projectId) => {
  try {
    // Recuperar el proyecto y obtener los mentores asociados
    const project = await Project.findById({_id: projectId}).populate('mentors');
    if (!project) {
      throw new Error('Proyecto no encontrado');
    }

    // Recuperar los estudiantes inscritos al proyecto
    const enrolledStudents = await Enrolled.find({ projects: projectId });

    if (!enrolledStudents.length) {
      throw new Error('No hay estudiantes inscritos en este proyecto');
    }

    // Filtrar estudiantes por rol
    const studentsByRole = {
      frontend: enrolledStudents.filter(student => student.role === 'Frontend'),
      backend: enrolledStudents.filter(student => student.role === 'Backend'),
      QA: enrolledStudents.filter(student => student.role === 'QA'),
      UXUI: enrolledStudents.filter(student => student.role === 'UX/UI')
    };

    // Calcular cuántos squads podemos formar (considerando el rol con menos estudiantes)
    const minSquads = Math.min(
      studentsByRole.frontend.length,
      studentsByRole.backend.length,
      studentsByRole.QA.length,
      studentsByRole.UXUI.length
    );

    if (minSquads === 0) {
      throw new Error('No hay suficientes estudiantes para formar squads completos');
    }

    const squads = [];
    const mentors = project.mentors;
    const totalMentors = mentors.length;

    // Crear los squads
    for (let i = 0; i < minSquads; i++) {
      const mentor = mentors[i % totalMentors]; // Asignar mentor de forma cíclica

      // Asignar estudiantes al squad
      const squad = new Squad({
        project: projectId,
        qa: [studentsByRole.QA[i]?._id],
        uxui: [studentsByRole.UXUI[i]?._id],
        frontends: [studentsByRole.frontend[i]?._id],
        backends: [studentsByRole.backend[i]?._id],
        mentor: mentor._id // Asignar mentor al squad
      });

      await squad.save();
      squads.push(squad);
    }

    return squads;
  } catch (error) {
    throw new Error('Error al generar squads: ' + error.message);
  }
};




/** OPCION 2 No funciono, quise hacer un bucle para que asigne los estudiantes de a uno y si quedan estudiantes siga asignando
 exports.createSquadsForProject = async (projectId) => {
  try {
    const project = await Project.findById(projectId).populate('mentors');
    
    if (!project) {
      throw new Error('Proyecto no encontrado');
    }

    const enrolledStudents = await Enrolled.find({ projects: projectId });

    if (!enrolledStudents.length) {
      throw new Error('No hay estudiantes inscritos en este proyecto');
    }

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
      studentsByRole.UXUI.length
    );

    if (minSquads === 0) {
      throw new Error('No hay suficientes estudiantes para formar squads completos');
    }

    const squads = [];
    const mentors = project.mentors;
    const totalMentors = mentors.length;

    // Crear los squads iniciales asegurando al menos 1 estudiante por rol
    for (let i = 0; i < minSquads; i++) {
      const mentor = mentors[i % totalMentors];  // Asignar mentor de forma cíclica

      // Inicializar los arrays vacíos para cada rol
      const squad = new Squad({
        project: projectId,
        qa: [],
        uxui: [],
        frontends: [],
        backends: [],
        mentor: mentor._id
      });

      // Asignar un estudiante por rol a cada squad
      squad.qa.push(studentsByRole.QA[i % studentsByRole.QA.length]._id);
      squad.uxui.push(studentsByRole.UXUI[i % studentsByRole.UXUI.length]._id);
      squad.frontends.push(studentsByRole.frontend[i % studentsByRole.frontend.length]._id);
      squad.backends.push(studentsByRole.backend[i % studentsByRole.backend.length]._id);

      await squad.save();
      squads.push(squad);
    }

    // Asignar estudiantes restantes después del mínimo
    let i = 0;
    let continueAssigning = true;

    while (continueAssigning) {
      continueAssigning = false;

      ['QA', 'UXUI', 'frontend', 'backend'].forEach(role => {
        if (studentsByRole[role].length > minSquads) {
          squads.forEach((squad, index) => {
            const studentIndex = i + minSquads;
            if (studentsByRole[role][studentIndex]) {
              // Verificar que el array del rol en el squad esté inicializado
              squad[role] = squad[role] || [];
              squad[role].push(studentsByRole[role][studentIndex]._id);
              continueAssigning = true;
            }
          });
        }
      });

      i++;
    }

    return squads;
  } catch (error) {
    throw new Error('Error al generar squads: ' + error.message);
  }
};
**/

/** OPCION 3 - Corre pero no funciona como esperaba ya que repite, Si tengo 2 squads y 2 estudiantes de 1 rol, asigna los 2 en el primer squad, y luego repite 1 en el segundo
exports.createSquadsForProject = async (projectId) => {
  try {
    // Recuperar el proyecto y obtener los mentores asociados
    const project = await Project.findById(projectId).populate('mentors');
    if (!project) {
      throw new Error('Proyecto no encontrado');
    }

    // Recuperar los estudiantes inscritos al proyecto
    const enrolledStudents = await Enrolled.find({ projects: projectId });

    if (!enrolledStudents.length) {
      throw new Error('No hay estudiantes inscritos en este proyecto');
    }

    // Filtrar estudiantes por rol
    const studentsByRole = {
      frontend: enrolledStudents.filter(student => student.role === 'Frontend'),
      backend: enrolledStudents.filter(student => student.role === 'Backend'),
      QA: enrolledStudents.filter(student => student.role === 'QA'),
      UXUI: enrolledStudents.filter(student => student.role === 'UX/UI')
    };

    // Calcular cuántos squads podemos formar (considerando el rol con menos estudiantes)
    const minSquads = Math.min(
      studentsByRole.frontend.length,
      studentsByRole.backend.length,
      studentsByRole.QA.length,
      studentsByRole.UXUI.length
    );

    if (minSquads === 0) {
      throw new Error('No hay suficientes estudiantes para formar squads completos');
    }

    const squads = [];
    const mentors = project.mentors;
    const totalMentors = mentors.length;

    // Crear los squads
    for (let i = 0; i < minSquads; i++) {
      const mentor = mentors[i % totalMentors]; // Asignar mentor de forma cíclica

      // Asignar hasta 2 estudiantes por rol si están disponibles, o al menos 1
      const squad = new Squad({
        project: projectId,
        qa: [
          studentsByRole.QA[i * 2] ? studentsByRole.QA[i * 2]._id : studentsByRole.QA[i]?._id,
          studentsByRole.QA[i * 2 + 1]?._id
        ].filter(Boolean), // Eliminar valores nulos o undefined

        uxui: [
          studentsByRole.UXUI[i * 2] ? studentsByRole.UXUI[i * 2]._id : studentsByRole.UXUI[i]?._id,
          studentsByRole.UXUI[i * 2 + 1]?._id
        ].filter(Boolean),

        frontends: [
          studentsByRole.frontend[i * 2] ? studentsByRole.frontend[i * 2]._id : studentsByRole.frontend[i]?._id,
          studentsByRole.frontend[i * 2 + 1]?._id
        ].filter(Boolean),

        backends: [
          studentsByRole.backend[i * 2] ? studentsByRole.backend[i * 2]._id : studentsByRole.backend[i]?._id,
          studentsByRole.backend[i * 2 + 1]?._id
        ].filter(Boolean),

        mentor: mentor._id // Asignar mentor al squad
      });

      await squad.save();
      squads.push(squad);
    }

    return squads;
  } catch (error) {
    throw new Error('Error al generar squads: ' + error.message);
  }
};

**/
