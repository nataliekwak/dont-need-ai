import "@testing-library/jest-dom";
import { useAssignmentStore } from '../../src/store/assignmentsStore.js';
import axios from 'axios';

// Mock axios
vi.mock('axios', () => {
    return {
        default: {
            defaults: { withCredentials: false },
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
        },
    };
});

describe('assignmentsStore', () => {
    beforeEach(() => {
        useAssignmentStore.setState({
            assignments: [],
            isLoading: false,
            error: null,
        });
        vi.clearAllMocks();
    });

    it('has correct initial state', () => {
        const state = useAssignmentStore.getState();

        expect(state.assignments).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
    });

    describe('setCurrentAssignment', () => {
        it('sets the current assignment', () => {
            const assignment = { _id: 1, title: 'Test Assignment' };

            useAssignmentStore.getState().setCurrentAssignment(assignment);
            const state = useAssignmentStore.getState();

            expect(state.currentAssignment).toEqual(assignment);
        });
    });

    describe('getAllAssignments', () => {
        it('fetches and sets all assignments on success', async () => {
            const assignmentsData = [
                { _id: 1, title: 'Assignment 1' },
                { _id: 2, title: 'Assignment 2' },
            ];

            axios.get.mockResolvedValue({ data: assignmentsData });
            await useAssignmentStore.getState().getAllAssignments();
            const state = useAssignmentStore.getState();

            expect(state.assignments).toEqual(assignmentsData);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe(null);
        });

        it('sets error on failure', async () => {
            axios.get.mockRejectedValue({ response: { data: { message: 'Error fetching assignments' } } });
            await useAssignmentStore.getState().getAllAssignments();
            const state = useAssignmentStore.getState();

            expect(state.error).toBe('Error fetching assignments');
            expect(state.isLoading).toBe(false);
        });
    });

    describe('getAssignmentById', () => {
        it('fetches and sets the current assignment on success', async () => {
            const assignmentData = { _id: 1, title: 'Assignment 1' };

            axios.get.mockResolvedValue({ data: assignmentData });
            await useAssignmentStore.getState().getAssignmentById(1);
            const state = useAssignmentStore.getState();

            expect(state.currentAssignment).toEqual(assignmentData);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe(null);
        });

        it('sets error on failure', async () => {
            axios.get.mockRejectedValue({ response: { data: { message: 'Error fetching assignment' } } });
            await useAssignmentStore.getState().getAssignmentById(1);
            const state = useAssignmentStore.getState();

            expect(state.error).toBe('Error fetching assignment');
            expect(state.isLoading).toBe(false);
        });
    });

    describe('createAssignment', () => {
        it('creates and adds a new assignment on success', async () => {
            const newAssignment = { _id: 1, title: 'New Assignment' };

            axios.post.mockResolvedValue({ data: newAssignment });
            await useAssignmentStore.getState().createAssignment('New Assignment');
            const state = useAssignmentStore.getState();

            expect(state.assignments).toContainEqual(newAssignment);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe(null);
        });

        it('sets error on failure', async () => {
            axios.post.mockRejectedValue({ response: { data: { message: 'Error creating assignment' } } });
            await useAssignmentStore.getState().createAssignment('New Assignment');
            const state = useAssignmentStore.getState();

            expect(state.error).toBe('Error creating assignment');
            expect(state.isLoading).toBe(false);
        });
    });

    describe('updateAssignment', () => {
        it('updates an existing assignment on success', async () => {
            const existingAssignment = { _id: 1, title: 'Old Title' };

            useAssignmentStore.setState({ assignments: [existingAssignment] });
            axios.put.mockResolvedValue({ data: { ...existingAssignment, title: 'New Title' } });
            axios.get.mockResolvedValue({ data: { _id: 1, title: 'New Title' } });

            await useAssignmentStore.getState().updateAssignment(1, { title: 'New Title' });
            const state = useAssignmentStore.getState();

            expect(state.assignments).toContainEqual({ _id: 1, title: 'New Title' });
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe(null);
        });

        it('sets error on failure', async () => {
            axios.put.mockRejectedValue({ response: { data: { message: 'Error updating assignment' } } });
            await useAssignmentStore.getState().updateAssignment(1, { title: 'New Title' });
            const state = useAssignmentStore.getState();

            expect(state.error).toBe('Error updating assignment');
            expect(state.isLoading).toBe(false);
        });

        it('sets error if no fields to update', async () => {
            await useAssignmentStore.getState().updateAssignment(1, {});
            const state = useAssignmentStore.getState();

            expect(state.error).toBe('No fields to update');
            expect(state.isLoading).toBe(false);
        });
    });

    describe('deleteAssignment', () => {
        it('deletes an assignment on success', async () => {
            const assignmentToDelete = { _id: 1, title: 'To Be Deleted' };

            useAssignmentStore.setState({ assignments: [assignmentToDelete] });
            axios.delete.mockResolvedValue({});

            await useAssignmentStore.getState().deleteAssignment(1);
            const state = useAssignmentStore.getState();

            expect(state.assignments).not.toContainEqual(assignmentToDelete);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe(null);
        });

        it('sets error on failure', async () => {
            axios.delete.mockRejectedValue({ response: { data: { message: 'Error deleting assignment' } } });
            await useAssignmentStore.getState().deleteAssignment(1);
            const state = useAssignmentStore.getState();

            expect(state.error).toBe('Error deleting assignment');
            expect(state.isLoading).toBe(false);
        });
    });
});