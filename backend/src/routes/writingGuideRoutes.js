import express from 'express';
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/writingGuideController.js';
import { getAllTopics, getTopicById, createTopic, updateTopic, deleteTopic } from '../controllers/topicController.js';
import { getAllSources, getSourceById, createSource, updateSource, deleteSource } from '../controllers/sourceController.js';
import { getAllEvidence, getEvidenceById, createEvidence, updateEvidence, deleteEvidence } from '../controllers/evidenceController.js';
import { verifyUser } from '../utils/verification.js';

const router = express.Router();

// Basic routes for assignments
router.get('/', verifyUser, getAllAssignments);

router.get('/:assignmentId', verifyUser, getAssignmentById);

router.post('/', verifyUser, createAssignment);

router.put('/:assignmentId', verifyUser, updateAssignment);

router.delete('/:assignmentId', verifyUser, deleteAssignment);

// Routes for a topic
router.get('/:assignmentId/topics', verifyUser, getAllTopics);

router.get('/:assignmentId/:topicId', verifyUser, getTopicById);

router.post('/:assignmentId/topic', verifyUser, createTopic);

router.put('/:assignmentId/:topicId', verifyUser, updateTopic);

router.delete('/:assignmentId/:topicId', verifyUser, deleteTopic);

// Routes for a source
router.get('/:assignmentId/:topicId/sources', verifyUser, getAllSources);

router.get('/:assignmentId/:topicId/:sourceId', verifyUser, getSourceById);

router.post('/:assignmentId/:topicId/source', verifyUser, createSource);

router.put('/:assignmentId/:topicId/:sourceId', verifyUser, updateSource);

router.delete('/:assignmentId/:topicId/:sourceId', verifyUser, deleteSource);

// Routes for evidence
router.get('/:assignmentId/:topicId/:sourceId/evidence', verifyUser, getAllSources);

router.get('/:assignmentId/:topicId/:sourceId/:evidenceId', verifyUser, getEvidenceById);

router.post('/:assignmentId/:topicId/:sourceId/evidence', verifyUser, createEvidence);

router.put('/:assignmentId/:topicId/:sourceId/:evidenceId', verifyUser, updateEvidence);

router.delete('/:assignmentId/:topicId/:sourceId/:evidenceId', verifyUser, deleteEvidence);

export default router;