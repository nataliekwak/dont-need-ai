import express from 'express';
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/writingGuideController.js';
import { verifyUser } from '../utils/verification.js';

const router = express.Router();

router.get('/', verifyUser, getAllAssignments);

router.get('/:id', verifyUser, getAssignmentById);

router.post('/', verifyUser, createAssignment);

router.put('/:assignmentId', verifyUser, updateAssignment);

router.delete('/:assignmentId', verifyUser, deleteAssignment);

export default router;