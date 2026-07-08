import express from 'express';
import { signup, signin, google, signOut, updateUser, deleteUser } from '../controls/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signOut);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;