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
            set({ assignments: res.data, isLoading: false });
        } catch (error) {
            set({ error: null, isLoading: false });
            console.error("Error fetching assignments:", error);
        }
    },
}));
