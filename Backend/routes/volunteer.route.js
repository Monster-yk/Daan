import express from 'express';
import { applyForVolunteering, getUserVolunteering, updateVolunteerStatus, deleteVolunteerApplication } from '../controls/volunteer.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/apply', verifyUser, applyForVolunteering);
router.get('/my-applications', verifyUser, getUserVolunteering);
router.put('/:volunteerId/status', verifyUser, updateVolunteerStatus);
router.delete('/:volunteerId', verifyUser, deleteVolunteerApplication);

export default router; 