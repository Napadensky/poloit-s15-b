const createSquadsForProject = require('./createSquad')


const enrolledData = [
    { "_id": "1", "role": "Frontend", "assigned": false },
    { "_id": "2", "role": "Backend", "assigned": false },
    { "_id": "3", "role": "QA", "assigned": false },
    { "_id": "4", "role": "Frontend", "assigned": false },
    { "_id": "5", "role": "UX/UI", "assigned": false },
    { "_id": "6", "role": "Backend", "assigned": false },
    { "_id": "7", "role": "Frontend", "assigned": false },
    { "_id": "8", "role": "QA", "assigned": false },
    { "_id": "9", "role": "Backend", "assigned": false },
    { "_id": "10", "role": "Frontend", "assigned": false },
    { "_id": "11", "role": "UX/UI", "assigned": false },
    { "_id": "12", "role": "Backend", "assigned": false }
];

const mentorsData = [
    { "_id": "mentor1" },
    { "_id": "mentor2" },
    { "_id": "mentor3" }
];

const projectsData = [
    { "_id": "project1", "mentors": ["mentor1", "mentor2", "mentor3"] }
];

createSquadsForProject('project1', enrolledData, mentorsData, projectsData)
    .then(squads => {
        console.log('Squads creados:', squads);
    })
    .catch(error => {
        console.error('Error al crear los squads:', error);
    });
