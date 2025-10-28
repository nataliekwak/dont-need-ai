import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5001/api/writing-guide";

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

export const useAssignmentStore = create((set) => ({
    assignments: [],
    error: null,
    isLoading: false,

    getAllAssignments: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/`);
            set({ assignments: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting all assignments", isLoading: false });
            console.error("Error fetching assignments:", error);
        }
    },

    createAssignment: async (title) => {
        set({ isLoading: true, error: null });

        // If the title is invalid, set an error and return early
        if (!title || title.trim() === "") {
            set({ error: "Title cannot be empty", isLoading: false });
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/`, { title });
            set((state) => ({ assignments: [...state.assignments, res.data], isLoading: false, error: null }));
        } catch (error) {
            set({ error: error.response.data.message || "Error creating assignment", isLoading: false });
            console.error("Error creating assignment:", error);
        }
    },


    updateAssignment: async (assignmentId, updatedFields) => {
        set({ isLoading: true, error: null });

        // If the updated fields are empty, set an error and return early
        if (!updatedFields || Object.keys(updatedFields).length === 0) {
            set({ error: "No fields to update", isLoading: false });
            return;
        }

        try {
            await axios.put(`${API_URL}/${assignmentId}`, updatedFields);

            // Update the assignment in the local state
            set((state) => ({
                assignments: state.assignments.map((assignment) =>
                    assignment._id === assignmentId ? { ...assignment, ...updatedFields } : assignment
                ),
                isLoading: false,
                error: null,
            }));

            // Always fetch latest assignments from backend after update
            const res = await axios.get(`${API_URL}/`);
            set({ assignments: res.data });
        } catch (error) {
            set({ error: error.response.data.message || "Error updating assignment", isLoading: false });
            console.error("Error updating assignment:", error);
        }
    },

    deleteAssignment: async (assignmentId) => {
        set({ isLoading: true, error: null });

        try {
            await axios.delete(`${API_URL}/${assignmentId}`);

            // Remove the assignment from the local state
            set((state) => ({
                assignments: state.assignments.filter((assignment) => assignment._id !== assignmentId),
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            set({ error: error.response.data.message || "Error deleting assignment", isLoading: false });
            console.error("Error deleting assignment:", error);
        }
    }
}));
