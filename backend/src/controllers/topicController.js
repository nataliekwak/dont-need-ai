import mongoose from 'mongoose';
import { Topic } from '../models/Topic.js';
import { Assignment } from '../models/Assignment.js';

// Get all topics for an assignment
export const getAllTopics = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const topics = await Topic.find({ assignmentId: assignmentId });
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get a topic by ID and assignment ID
export const getTopicById = async (req, res) => {
    try {
        const { assignmentId, topicId } = req.params;

        // Validate assignmentId
        if (!mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        // Validate  topicId
        if (!mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }

        const topic = await Topic.findOne({ _id: topicId, assignmentId: assignmentId });

        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create a topic document
export const createTopic = async (req, res) => {
    try {
        const newTopic = new Topic({
            assignmentId: req.params.assignmentId,
            name: req.body.name,
        });
        await newTopic.save();

        // Add topic reference to Assignment model
        await Assignment.findByIdAndUpdate(
            req.params.assignmentId,
            { $push: { topicIds: newTopic._id, topicNames: newTopic.name } }
        );

        res.status(201).json(newTopic);
    } catch (error) {
        console.error("Error creating topic: ", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Update a topic document
export const updateTopic = async (req, res) => {
    try {
        const { topicId } = req.params;

        // Validate topicId
        if (!mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }

        const updatedTopic = await Topic.findByIdAndUpdate(
            topicId,
            req.body,
            { new: true }
        );

        if (!updatedTopic) {
            return res.status(404).json({ error: "Topic not found" });
        }

        res.status(200).json(updatedTopic);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a topic document
export const deleteTopic = async (req, res) => {
    try {
        const { topicId } = req.params;

        // Validate topicId
        if (!mongoose.isValidObjectId(topicId)) {
            return res.status(400).json({ error: "Invalid topic ID" });
        }
        const deletedTopic = await Topic.findByIdAndDelete(topicId);

        if (!deletedTopic) {
            return res.status(404).json({ error: "Topic not found" });
        }

        // Remove topic reference from Assignment model
        await Assignment.findByIdAndUpdate(
            deletedTopic.assignmentId,
            { $pull: { topicIds: deletedTopic._id, topicNames: deletedTopic.name } }
        );

        res.status(200).json({ message: "Topic deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};