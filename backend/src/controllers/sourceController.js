import mongoose from 'mongoose';
import { Source } from '../models/Source.js';
import { Topic } from '../models/Topic.js';

// Get all sources for a specific topic within an assignment
export const getAllSources = async (req, res) => {
    try {
        const { assignmentId, topicId } = req.params;

        // Validate assignmentId
        if (!mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        // Validate topicId
        if (!mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }

        const sources = await Source.find({ topicId: topicId });
        res.status(200).json(sources);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get a source by ID within a specific topic and assignment
export const getSourceById = async (req, res) => {
    try {
        const { assignmentId, topicId, sourceId } = req.params;

        // Validate assignmentId
        if (!mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        // Validate topicId
        if (!mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }

        // Validate sourceId
        if (!mongoose.isValidObjectId(sourceId)) {
            return res.status(400).json({ error: "Invalid source ID" });
        }

        const source = await Source.findOne({ _id: sourceId, topicId: topicId });

        if (!source) {
            return res.status(404).json({ message: "Source not found" });
        }

        res.status(200).json(source);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create a source document
export const createSource = async (req, res) => {
    try {
        // If the body doesn't include a title, return an error
        if (!req.body.title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const newSource = new Source({
            topicId: req.params.topicId,
            ...req.body
        });
        await newSource.save();

        // Add source reference to Topic model
        await Topic.findByIdAndUpdate(
            req.params.topicId,
            { $push: { sourceIds: newSource._id } }
        );

        res.status(201).json(newSource);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Update a source document
export const updateSource = async (req, res) => {
    try {
        const { sourceId } = req.params;

        // Validate sourceId
        if (!mongoose.isValidObjectId(sourceId)) {
            return res.status(400).json({ error: "Invalid source ID" });
        }

        const updatedSource = await Source.findByIdAndUpdate(
            sourceId,
            req.body,
            { new: true }
        );

        if (!updatedSource) {
            return res.status(404).json({ message: "Source not found" });
        }

        res.status(200).json(updatedSource);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a source document
export const deleteSource = async (req, res) => {
    try {
        const { sourceId } = req.params;

        // Validate sourceId
        if (!mongoose.isValidObjectId(sourceId)) {
            return res.status(400).json({ error: "Invalid source ID" });
        }

        const deletedSource = await Source.findByIdAndDelete(sourceId);

        if (!deletedSource) {
            return res.status(404).json({ message: "Source not found" });
        }

        // Remove source reference from Topic model
        await Topic.findByIdAndUpdate(
            deletedSource.topicId,
            { $pull: { sourceIds: deletedSource._id } }
        );

        res.status(200).json({ message: "Source deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};