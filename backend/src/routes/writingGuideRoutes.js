import express from 'express';
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/writingGuideController.js';

const router = express.Router();

router.get('/', getAllAssignments);

router.get('/:id', getAssignmentById);

router.post('/', createAssignment);

router.put('/:assignmentId', updateAssignment);

router.delete('/:assignmentId', deleteAssignment);

export default router;