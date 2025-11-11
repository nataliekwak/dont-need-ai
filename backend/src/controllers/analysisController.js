import Mongoose from 'mongoose';
import { Analysis } from '../models/Analysis.js';
import { Topic } from '../models/Topic.js';

// Get all analysis for a specific topic within an assignment
export const getAllAnalyses = async (req, res) => {
    try {
        const { assignmentId, topicId } = req.params;

        // Validate all ids
        if (!Mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }
        if (!Mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }

        const analysisList = await Analysis.find({ topicId: topicId });
        res.status(200).json(analysisList);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get an analysis by ID within a specific topic and assignment
export const getAnalysisById = async (req, res) => {
    try {
        const { assignmentId, topicId, analysisId } = req.params;

        // Validate all ids
        if (!Mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }
        if (!Mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }
        if (!Mongoose.isValidObjectId(analysisId)) {
            return res.status(400).json({ error: "Invalid analysis ID" });
        }

        const analysis = await Analysis.findOne({ _id: analysisId, topicId: topicId });

        if (!analysis) {
            return res.status(404).json({ message: "Analysis not found" });
        }

        res.status(200).json(analysis);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create an analysis document
export const createAnalysis = async (req, res) => {
    try {
        const newAnalysis = new Analysis({
            topicId: req.params.topicId,
            content: req.body.content,
        });

        await newAnalysis.save();

        // Add analysis reference to the topic model
        await Topic.findByIdAndUpdate(req.params.topicId, { $push: { analysisIds: newAnalysis._id } });

        res.status(201).json(newAnalysis);
    } catch (error) {
        console.error("Error creating analysis: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update an analysis document
export const updateAnalysis = async (req, res) => {
    try {
        const { analysisId } = req.params;

        // Validate analysisId
        if (!Mongoose.isValidObjectId(analysisId)) {
            return res.status(400).json({ error: "Invalid analysis ID" });
        }

        const updatedAnalysis = await Analysis.findByIdAndUpdate(
            analysisId,
            req.body,
            { new: true }
        );

        if (!updatedAnalysis) {
            return res.status(404).json({ message: "Analysis not found" });
        }

        res.status(200).json(updatedAnalysis);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete an analysis document
export const deleteAnalysis = async (req, res) => {
    try {
        const { analysisId } = req.params;

        // Validate analysisId
        if (!Mongoose.isValidObjectId(analysisId)) {
            return res.status(400).json({ error: "Invalid analysis ID" });
        }

        const deletedAnalysis = await Analysis.findByIdAndDelete(analysisId);

        if (!deletedAnalysis) {
            return res.status(404).json({ message: "Analysis not found" });
        }

        // Remove analysis reference from the topic model
        await Topic.findByIdAndUpdate(deletedAnalysis.topicId, { $pull: { analysisIds: analysisId } });

        res.status(200).json({ message: "Analysis deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};