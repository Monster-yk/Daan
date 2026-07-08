import express from 'express';
import { applyForVolunteering, getUserVolunteering, updateVolunteerStatus, deleteVolunteerApplication } from '../controls/volunteer.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/apply', verifyToken, applyForVolunteering);
router.get('/my-applications', verifyToken, getUserVolunteering);
router.put('/:volunteerId/status', verifyToken, updateVolunteerStatus);
router.delete('/:volunteerId', verifyToken, deleteVolunteerApplication);

export default router; 