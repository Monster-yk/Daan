import express from 'express';
import { createElectronics, createFood,createClothes, createStationary, createToys, getUserDonations } from '../controls/donate.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
// import { createClothes } from '../controls/donate.controller.js';
// import {verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createFood);
router.post('/createClothes', verifyToken, createClothes);
router.post('/createElectronics', verifyToken, createElectronics);
router.post('/createStationary', verifyToken, createStationary);
router.post('/createToys', verifyToken, createToys)
router.get('/my-donations', verifyToken, getUserDonations);

export default router;
