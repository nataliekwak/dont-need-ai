import mongoose from 'mongoose';

import { Assignment } from '../models/Assignment.js';
import { User } from '../models/User.js';

export const getAllAssignments = async (req, res) => {

    try {
        // Get all assignments belonging to the authenticated user
        const assignments = await Assignment.find({ userId: req.userId }).sort({ createdAt: -1 }); // Show newest first
        res.status(200).json(assignments);
    } catch (error) {
        console.error("Error fetching assignments: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAssignmentById = async (req, res) => {
    try {
        // Get assignment by ID and by the authenticated user
        const assignment = await Assignment.findOne({ _id: req.params.id, userId: req.userId });

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.status(200).json(assignment);
    } catch (error) {
        console.error("Error fetching assignment: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createAssignment = async (req, res) => {
    try {
        // Create a new assignment
        const newAssignment = new Assignment({
            userId: req.userId,
            title: req.body.title,
        });
        await newAssignment.save();

        // Add assignment reference to User model
        await User.findByIdAndUpdate(
            req.userId,
            { $push: { assignments: newAssignment._id } }
        );

        res.status(201).json({ message: "Assignment created successfully." });
    } catch (error) {
        console.error("Error creating assignment: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        if (!mongoose.isValidObjectId(assignmentId)) {
            return res.status(400).json({ error: "Invalid assignment ID" });
        }

        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            req.body,
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        res.status(200).json({ message: "Assignment updated successfully." });
    } catch (error) {
        console.error("Error updating assignment: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteAssignment = async (req, res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);

        if (!deletedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Remove assignment reference from User model
        await User.findByIdAndUpdate(
            deletedAssignment.userId,
            { $pull: { assignments: deletedAssignment._id } }
        );

        res.json({ message: "Assignment deleted successfully." });
    } catch (error) {
        console.error("Error deleting assignment: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};