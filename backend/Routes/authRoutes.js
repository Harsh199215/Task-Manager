import express from 'express';
import { register, login, getMembers } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register); 
router.post('/login', login);
router.get('/members', getMembers); 

export default router;