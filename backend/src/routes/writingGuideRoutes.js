import express from 'express';
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/writingGuideController.js';
import { getTopicById, createTopic, updateTopic, deleteTopic } from '../controllers/topicController.js';
import { verifyUser } from '../utils/verification.js';

const router = express.Router();

// Basic routes for assignments
router.get('/', verifyUser, getAllAssignments);

router.get('/:assignmentId', verifyUser, getAssignmentById);

router.post('/', verifyUser, createAssignment);

router.put('/:assignmentId', verifyUser, updateAssignment);

router.delete('/:assignmentId', verifyUser, deleteAssignment);

// Routes for a topic
router.get('/:assignmentId/:topicId', verifyUser, getTopicById);

router.post('/:assignmentId/topic', verifyUser, createTopic);

router.put('/:assignmentId/:topicId', verifyUser, updateTopic);

router.delete('/:assignmentId/:topicId', verifyUser, deleteTopic);

export default router;