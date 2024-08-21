const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.post('/mentors', mentorController.createMentor);

router.get('/mentors', mentorController.getAllMentors);

router.get('/mentors/:id', mentorController.getMentorById);

router.put('/mentors/:id', mentorController.updateMentorById);

router.delete('/mentors/:id', mentorController.deleteMentorById);

module.exports = router;
