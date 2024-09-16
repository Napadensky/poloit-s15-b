const createSquadsForProject = async (projectId, enrolledData, mentorsData, projectsData) => {
    try {
      // Busco el proyecto y los mentores asociados
      const project = projectsData.find(p => p._id === projectId);
      if (!project) throw new Error('Project not found');
      
      const mentors = mentorsData;
      const enrolledStudents = enrolledData.filter(e => !e.assigned);
  
      // Filtro inscritos por rol
      const roleGroups = {
        QA: [],
        'UX/UI': [],
        Frontend: [],
        Backend: []
      };
  
      enrolledStudents.forEach(e => roleGroups[e.role].push(e));
  
      // Creo squads
      const squads = [];
      const totalTeams = Math.min(
        roleGroups.QA.length,
        roleGroups['UX/UI'].length,
        Math.floor(roleGroups.Frontend.length / 2),
        Math.floor(roleGroups.Backend.length / 2)
      );
  
      for (let i = 0; i < totalTeams; i++) {
        const squadMembers = {
          qa: roleGroups.QA[i],
          uxui: roleGroups['UX/UI'][i],
          frontends: roleGroups.Frontend.slice(i * 2, i * 2 + 2),
          backends: roleGroups.Backend.slice(i * 2, i * 2 + 2)
        };
  
        if (squadMembers.qa && squadMembers.uxui && squadMembers.frontends.length === 2 && squadMembers.backends.length === 2) {
          const mentor = mentors[i % mentors.length]._id;
  
          const squad = {
            project: projectId,
            qa: squadMembers.qa._id,
            uxui: squadMembers.uxui._id,
            frontends: squadMembers.frontends.map(e => e._id),
            backends: squadMembers.backends.map(e => e._id),
            mentor: mentor
          };
  
          squads.push(squad);
  
          // Marco los inscritos como asignados
          squadMembers.frontends.concat(squadMembers.backends).concat(squadMembers.qa).concat(squadMembers.uxui).forEach(e => {
            const enrolled = enrolledData.find(student => student._id === e._id);
            if (enrolled) enrolled.assigned = true;
          });
        }
      }
  
      console.log('Squads creados:', squads);
  
      return squads;
    } catch (error) {
      console.error("Error creating squads:", error);
      throw error;
    }
  };
  

  
    module.exports = createSquadsForProject;
