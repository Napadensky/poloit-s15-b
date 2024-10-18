const updateAssigned = require('./updateAssigned');

const assignRemainingStudents = async (remainingStudents, squads) => {
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
    await updateAssigned(allUpdatedSquads);
};

module.exports = assignRemainingStudents;
