import Mongoose from 'mongoose';
import { Evidence } from '../models/Evidence.js';
import { Source } from '../models/Source.js';

// Get all evidence for a specific source within a topic and assignment
export const getAllEvidence = async (req, res) => {
    try {
        const { assignmentId, topicId, sourceId } = req.params;

        // Validate all ids
        if (!Mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }
        if (!Mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }
        if (!Mongoose.isValidObjectId(sourceId)) {
            return res.status(400).json({ error: "Invalid source ID" });
        }

        const evidenceList = await Evidence.find({ sourceId: sourceId });
        res.status(200).json(evidenceList);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get an evidence by ID within a specific source, topic, and assignment
export const getEvidenceById = async (req, res) => {
    try {
        const { assignmentId, topicId, sourceId, evidenceId } = req.params;

        // Validate all ids
        if (!Mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }
        if (!Mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }
        if (!Mongoose.isValidObjectId(sourceId)) {
            return res.status(400).json({ error: "Invalid source ID" });
        }
        if (!Mongoose.isValidObjectId(evidenceId)) {
            return res.status(400).json({ error: "Invalid evidence ID" });
        }

        const evidence = await Evidence.findOne({ _id: evidenceId, sourceId: sourceId });

        if (!evidence) {
            return res.status(404).json({ message: "Evidence not found" });
        }

        res.status(200).json(evidence);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create an evidence document
export const createEvidence = async (req, res) => {
    try {
        const newEvidence = new Evidence({
            sourceId: req.params.sourceId,
            type: req.body.type,
            content: req.body.content,
        });
        await newEvidence.save();

        // Add evidence reference to Source model
        await Source.findByIdAndUpdate(
            req.params.sourceId,
            { $push: { evidenceIds: newEvidence._id } }
        );

        res.status(201).json(newEvidence);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Update an evidence document
export const updateEvidence = async (req, res) => {
    try {
        const { evidenceId } = req.params;

        // Validate evidenceId
        if (!Mongoose.isValidObjectId(evidenceId)) {
            return res.status(400).json({ error: "Invalid evidence ID" });
        }

        const updatedEvidence = await Evidence.findByIdAndUpdate(
            evidenceId,
            req.body,
            { new: true }
        );

        if (!updatedEvidence) {
            return res.status(404).json({ message: "Evidence not found" });
        }

        res.status(200).json(updatedEvidence);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete an evidence document
export const deleteEvidence = async (req, res) => {
    try {
        const { evidenceId } = req.params;

        // Validate evidenceId
        if (!Mongoose.isValidObjectId(evidenceId)) {
            return res.status(400).json({ error: "Invalid evidence ID" });
        }

        const deletedEvidence = await Evidence.findByIdAndDelete(evidenceId);

        if (!deletedEvidence) {
            return res.status(404).json({ message: "Evidence not found" });
        }

        res.status(200).json({ message: "Evidence deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};