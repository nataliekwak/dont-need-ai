import express from 'express';
import { createAssignment, getAllAssignments } from '../controllers/assignmentsController.js';

const router = express.Router();

router.get('/', getAllAssignments);

router.post('/', createAssignment);

export default router;