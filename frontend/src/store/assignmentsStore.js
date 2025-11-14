import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5001/api/writing-guide";

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

export const useAssignmentStore = create((set) => ({
    assignments: [],
    currentAssignment: null,
    error: null,
    isLoading: false,

    setCurrentAssignment: (assignment) => {
        set({ currentAssignment: assignment });
    },

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

    getAssignmentById: async (assignmentId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}`);
            set({ currentAssignment: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting assignment", isLoading: false });
            console.error("Error fetching assignment:", error);
            console.log(error.response.data.message);
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

            // Always fetch latest assignment from backend after update
            const res = await axios.get(`${API_URL}/${assignmentId}`);
            set({ currentAssignment: res.data });
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
    },

    // Store for the assignment topics
    topics: [],
    currentTopic: null,

    setCurrentTopic: (topic) => {
        set({ currentTopic: topic });
    },

    getAllTopics: async (assignmentId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}/topics`);
            set({ topics: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting all topics", isLoading: false });
            console.error("Error fetching topics:", error);
        }
    },

    getTopicById: async (assignmentId, topicId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}`);
            set({ currentTopic: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting topic", isLoading: false });
            console.error("Error fetching topic:", error);
        }
    },

    createTopic: async (assignmentId, name) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.post(`${API_URL}/${assignmentId}/topic`, { name });
            set((state) => ({ topics: [...state.topics, res.data], isLoading: false, error: null }));
        } catch (error) {
            set({ error: error.response.data.message || "Error creating topic", isLoading: false });
            console.error("Error creating topic:", error);
        }
    },

    updateTopic: async (assignmentId, topicId, updatedFields) => {
        set({ isLoading: true, error: null });
        try {
            await axios.put(`${API_URL}/${assignmentId}/${topicId}`, updatedFields);

            // Update the topic in the local state
            set((state) => ({
                topics: state.topics.map((topic) =>
                    topic._id === topicId ? { ...topic, ...updatedFields } : topic
                ),
                isLoading: false,
                error: null,
            }));

            // Always fetch latest topic from backend after update
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}`);
            set({ currentTopic: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error updating topic", isLoading: false });
            console.error("Error updating topic:", error);
        }
    },

    deleteTopic: async (assignmentId, topicId) => {
        set({ isLoading: true, error: null });

        try {
            await axios.delete(`${API_URL}/${assignmentId}/${topicId}`);

            // Remove the topic from the local state
            set((state) => ({
                topics: state.topics.filter((topic) => topic._id !== topicId),
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            set({ error: error.response.data.message || "Error deleting topic", isLoading: false });
            console.error("Error deleting topic:", error);
        }
    },

    // Store for the topic's sources
    sources: [],
    currentSource: null,

    setCurrentSource: (source) => {
        set({ currentSource: source });
    },

    // Fetch all sources for a given topic within an assignment
    getAllSources: async (assignmentId, topicId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}/sources`);
            set({ sources: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting all sources", isLoading: false });
            console.error("Error fetching sources:", error);
        }
    },

    getSourceById: async (assignmentId, topicId, sourceId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}/${sourceId}`);
            set({ currentSource: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting source", isLoading: false });
            console.error("Error fetching source:", error);
        }
    },

    createSource: async (assignmentId, topicId, sourceData) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.post(`${API_URL}/${assignmentId}/${topicId}/source`, sourceData);
            set((state) => ({ sources: [...state.sources, res.data], isLoading: false, error: null }));
        } catch (error) {
            set({ error: error.response.data.message || "Error creating source", isLoading: false });
            console.error("Error creating source:", error);
        }
    },

    updateSource: async (assignmentId, topicId, sourceId, updatedFields) => {
        set({ isLoading: true, error: null });
        try {
            await axios.put(`${API_URL}/${assignmentId}/${topicId}/${sourceId}`, updatedFields);

            // Update the source in the local state
            set((state) => ({
                sources: state.sources.map((source) =>
                    source._id === sourceId ? { ...source, ...updatedFields } : source
                ),
                isLoading: false,
                error: null,
            }));

            // Always fetch latest source from backend after update
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}/${sourceId}`);
            set({ currentSource: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error updating source", isLoading: false });
            console.error("Error updating source:", error);
        }
    },

    deleteSource: async (assignmentId, topicId, sourceId) => {
        set({ isLoading: true, error: null });

        try {
            await axios.delete(`${API_URL}/${assignmentId}/${topicId}/${sourceId}`);
            // Remove the source from the local state
            set((state) => ({
                sources: state.sources.filter((source) => source._id !== sourceId),
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            set({ error: error.response.data.message || "Error deleting source", isLoading: false });
            console.error("Error deleting source:", error);
        }
    },

    // Store for the topic's evidence
    evidence: [],
    currentEvidence: null,

    setCurrentEvidence: (evidence) => {
        set({ currentEvidence: evidence });
    },

    // Fetch all evidence for a specific source within a topic and assignment
    getAllEvidenceBySource: async (assignmentId, topicId, sourceId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}/${sourceId}/evidence`);
            set({ evidence: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting all evidence", isLoading: false });
            console.error("Error fetching evidence:", error);
        }
    },

    // Fetch all evidence for a specific topic within an assignment
    getAllEvidenceByTopic: async (assignmentId, topicId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}/evidence`);
            set({ evidence: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting all evidence", isLoading: false });
            console.error("Error fetching evidence:", error);
        }
    },

    getEvidenceById: async (assignmentId, topicId, sourceId, evidenceId) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}/${sourceId}/${evidenceId}`);
            set({ currentEvidence: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error getting evidence", isLoading: false });
            console.error("Error fetching evidence:", error);
        }
    },

    createEvidence: async (assignmentId, topicId, sourceId, evidenceData) => {
        set({ isLoading: true, error: null });

        try {
            const res = await axios.post(`${API_URL}/${assignmentId}/${topicId}/${sourceId}/evidence`, evidenceData);
            set((state) => ({ evidence: [...state.evidence, res.data], isLoading: false, error: null }));
        } catch (error) {
            set({ error: error.response.data.message || "Error creating evidence", isLoading: false });
            console.error("Error creating evidence:", error);
        }
    },

    updateEvidence: async (assignmentId, topicId, sourceId, evidenceId, updatedFields) => {
        set({ isLoading: true, error: null });
        try {
            await axios.put(`${API_URL}/${assignmentId}/${topicId}/${sourceId}/${evidenceId}`, updatedFields);

            // Update the evidence in the local state
            set((state) => ({
                evidence: state.evidence.map((evidence) =>
                    evidence._id === evidenceId ? { ...evidence, ...updatedFields } : evidence
                ),
                isLoading: false,
                error: null,
            }));

            // Always fetch latest evidence from backend after update
            const res = await axios.get(`${API_URL}/${assignmentId}/${topicId}/${sourceId}/${evidenceId}`);
            set({ currentEvidence: res.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error updating evidence", isLoading: false });
            console.error("Error updating evidence:", error);
        }
    },

    deleteEvidence: async (assignmentId, topicId, sourceId, evidenceId) => {
        set({ isLoading: true, error: null });

        try {
            await axios.delete(`${API_URL}/${assignmentId}/${topicId}/${sourceId}/${evidenceId}`);

            // Remove the evidence from the local state
            set((state) => ({
                evidence: state.evidence.filter((evidence) => evidence._id !== evidenceId),
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            set({ error: error.response.data.message || "Error deleting evidence", isLoading: false });
            console.error("Error deleting evidence:", error);
        }
    },
}));
