const Enrolled = require('../../../models/Enrolled');
const Mentor = require('../../../models/Mentor');

const updateAssigned = async (squads) => {
    try {
      console.log('Starting updateAssigned');
      for (const squad of squads) {
        console.log('Processing squad:', squad._id);
        
        // Actualizar los estudiantes de cada rol
        const allStudentIds = [
          ...(Array.isArray(squad.qa) ? squad.qa : []),
          ...(Array.isArray(squad.uxui) ? squad.uxui : []),
          ...(Array.isArray(squad.frontends) ? squad.frontends : []),
          ...(Array.isArray(squad.backends) ? squad.backends : [])
        ].filter(id => id); // Filtra cualquier valor null o undefined

        console.log('Student IDs to update:', allStudentIds);

        if (allStudentIds.length > 0) {
          // Actualizar el estado 'assigned' de todos los estudiantes involucrados
          const result = await Enrolled.updateMany(
            { _id: { $in: allStudentIds } },
            { $set: { assigned: true } }
          );
          console.log('Update result for students:', result);
        }

        // Actualizar el mentor asignado
        if (squad.mentor) {
          const mentorResult = await Mentor.updateOne(
            { _id: squad.mentor },
            { $set: { assigned: true } }
          );
          console.log('Update result for mentor:', mentorResult);
        }
      }
      console.log('Finished updateAssigned');
    } catch (error) {
      console.error('Error in updateAssigned:', error);
      throw new Error('Error al actualizar el estado de asignación: ' + error.message);
    }
  };

module.exports = updateAssigned;

