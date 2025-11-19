import express from 'express';
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/writingGuideController.js';
import { getAllTopics, getTopicById, createTopic, updateTopic, deleteTopic } from '../controllers/topicController.js';
import { getAllSources, getSourceById, createSource, updateSource, deleteSource } from '../controllers/sourceController.js';
import { getAllEvidenceBySource, getAllEvidenceByTopic, getEvidenceById, createEvidence, updateEvidence, deleteEvidence } from '../controllers/evidenceController.js';
import { getAllAnalyses, getAnalysisById, createAnalysis, updateAnalysis, deleteAnalysis } from '../controllers/analysisController.js';
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

router.get('/:assignmentId/topic/:topicId', verifyUser, getTopicById);

router.post('/:assignmentId/topic', verifyUser, createTopic);

router.put('/:assignmentId/topic/:topicId', verifyUser, updateTopic);

router.delete('/:assignmentId/topic/:topicId', verifyUser, deleteTopic);

// Routes for a source
router.get('/:assignmentId/topic/:topicId/sources', verifyUser, getAllSources);

router.get('/:assignmentId/topic/:topicId/source/:sourceId', verifyUser, getSourceById);

router.post('/:assignmentId/topic/:topicId/source', verifyUser, createSource);

router.put('/:assignmentId/topic/:topicId/source/:sourceId', verifyUser, updateSource);

router.delete('/:assignmentId/topic/:topicId/source/:sourceId', verifyUser, deleteSource);

// Routes for evidence
router.get('/:assignmentId/topic/:topicId/source/:sourceId/evidence', verifyUser, getAllEvidenceBySource);

router.get('/:assignmentId/topic/:topicId/evidence', verifyUser, getAllEvidenceByTopic);

router.get('/:assignmentId/topic/:topicId/source/:sourceId/evidence/:evidenceId', verifyUser, getEvidenceById);

router.post('/:assignmentId/topic/:topicId/source/:sourceId/evidence', verifyUser, createEvidence);

router.put('/:assignmentId/topic/:topicId/source/:sourceId/evidence/:evidenceId', verifyUser, updateEvidence);

router.delete('/:assignmentId/topic/:topicId/source/:sourceId/evidence/:evidenceId', verifyUser, deleteEvidence);

// Routes for analysis
router.get('/:assignmentId/topic/:topicId/analyses', verifyUser, getAllAnalyses);

router.get('/:assignmentId/topic/:topicId/analysis/:analysisId', verifyUser, getAnalysisById);

router.post('/:assignmentId/topic/:topicId/analysis', verifyUser, createAnalysis);

router.put('/:assignmentId/topic/:topicId/analysis/:analysisId', verifyUser, updateAnalysis);

router.delete('/:assignmentId/topic/:topicId/analysis/:analysisId', verifyUser, deleteAnalysis);

export default router;