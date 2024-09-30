const Enrolled = require('../../../models/Enrolled');
const Squad = require('../../../models/Squad');
const Project = require('../../../models/Projects');
const Mentor = require('../../../models/Mentor');

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
    await updateAssignedStatusForSquadMembers(squads);

    // Realizar una nueva consulta para verificar si quedan estudiantes no asignados
    let remainingStudents = await Enrolled.find({ projects: projectId, assigned: false });

    // Si hay estudiantes no asignados, distribuirlos en los squads ya existentes
    if (remainingStudents.length > 0) {
          await assignRemainingStudentsToSquads(remainingStudents, squads);
     }

    return squads;
  } catch (error) {
    throw new Error('Error al generar squads: ' + error.message);
  }
};

// Función que recibe los squads y actualiza el campo 'assigned' para los estudiantes y mentores
const updateAssignedStatusForSquadMembers = async (squads) => {
  try {
    for (const squad of squads) {
      // Actualizar los estudiantes de cada rol
      const allStudentIds = [
        ...squad.qa,
        ...squad.uxui,
        ...squad.frontends,
        ...squad.backends
      ];

      // Actualizar el estado 'assigned' de todos los estudiantes involucrados
      await Enrolled.updateMany(
        { _id: { $in: allStudentIds } },
        { $set: { assigned: true } }
      );

      // Actualizar el mentor asignado
      if (squad.mentor) {
        await Mentor.updateOne(
          { _id: squad.mentor },
          { $set: { assigned: true } }
        );
      }
    }
  } catch (error) {
    throw new Error('Error al actualizar el estado de asignación: ' + error.message);
  }
};
const assignRemainingStudentsToSquads = async (remainingStudents, squads) => {
  const studentsByRole = {
    frontend: remainingStudents.filter(student => student.role === 'Frontend'),
    backend: remainingStudents.filter(student => student.role === 'Backend'),
    QA: remainingStudents.filter(student => student.role === 'QA'),
    UXUI: remainingStudents.filter(student => student.role === 'UX/UI')
  };

  // Recorremos los squads y tratamos de asignar estudiantes de los roles
  for (const squad of squads) {
    if (studentsByRole.QA.length > 0) {
      squad.qa.push(studentsByRole.QA.shift()._id); // Agregar estudiante de QA
    }
    if (studentsByRole.UXUI.length > 0) {
      squad.uxui.push(studentsByRole.UXUI.shift()._id); // Agregar estudiante de UX/UI
    }
    if (studentsByRole.frontend.length > 0) {
      squad.frontends.push(studentsByRole.frontend.shift()._id); // Agregar estudiante de Frontend
    }
    if (studentsByRole.backend.length > 0) {
      squad.backends.push(studentsByRole.backend.shift()._id); // Agregar estudiante de Backend
    }

    await squad.save(); // Guardar los cambios en el squad
  }

  // Actualizar el estado de asignación de los estudiantes restantes
  const allUpdatedSquads = squads.map(squad => squad._id);
  await updateAssignedStatusForSquadMembers(allUpdatedSquads);
};
