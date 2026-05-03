import express from 'express';
import { createProject, addMember } from '../controllers/projectController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createProject);
router.post('/add-member', authenticate, addMember);

export default router;