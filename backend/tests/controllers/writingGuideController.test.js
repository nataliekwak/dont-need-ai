import { describe, expect, it, vi } from 'vitest';
import { getAllAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment } from '../../src/controllers/writingGuideController.js';
import { Assignment } from '../../src/models/Assignment.js';

const validObjectId = '507f1f77bcf86cd799439011';
const mockedUserId = 'mocked-user-id';

function mockAssignment(overrides = {}) {
    return {
        _id: validObjectId,
        userId: mockedUserId,
        title: 'Assignment 1',
        step: 1,
        prompt: 'Prompt 1',
        startSmall: true,
        writingGoals: ['Goal 1'],
        smallAnswers: ['Answer 1'],
        bigAnswer: 'Big Answer',
        topics: ['Topic 1'],
        updatedAt: new Date(),
        ...overrides
    };
}

function createReq(params = {}, body = {}) {
    return {
        userId: mockedUserId,
        params,
        body
    };
}

// Helper to create a mock response object
function createMockRes() {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        clearCookie: vi.fn && vi.fn() // for logout
    };
}

describe('Writing Guide Controller', () => {

    describe('getAllAssignments', () => {
        it('should fetch all assignments for the authenticated user', async () => {
            const req = createReq();
            const res = createMockRes();
            const sampleAssignments = [mockAssignment(), mockAssignment({ _id: '2', title: 'Assignment 2', step: 2 })];

            vi.spyOn(Assignment, 'find').mockReturnValue({ sort: vi.fn().mockReturnValue(Promise.resolve(sampleAssignments)) });

            await getAllAssignments(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(sampleAssignments);
        });
    });

    describe('getAssignmentById', () => {
        it('should fail for invalid assignment ID', async () => {
            const req = createReq({ assignmentId: 'invalid-id' });
            const res = createMockRes();

            await getAssignmentById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid assignment ID" });
        });

        it('should fail if assignment not found', async () => {
            const req = createReq({ assignmentId: validObjectId });
            const res = createMockRes();

            vi.spyOn(Assignment, 'findOne').mockReturnValue(Promise.resolve(null));

            await getAssignmentById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Assignment not found" });
        });

        it('should fetch an assignment by ID for the authenticated user', async () => {
            const req = createReq({ assignmentId: validObjectId });
            const res = createMockRes();
            const sampleAssignment = mockAssignment();

            vi.spyOn(Assignment, 'findOne').mockReturnValue(Promise.resolve(sampleAssignment));

            await getAssignmentById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(sampleAssignment);
        });
    });

    describe('createAssignment', () => {
        it('should create a new assignment for the authenticated user', async () => {
            const req = createReq({}, { title: 'New Assignment' });
            const res = createMockRes();
            const savedAssignment = mockAssignment({ _id: 'new-assignment-id', title: 'New Assignment' });

            vi.spyOn(Assignment.prototype, 'save').mockReturnValue(Promise.resolve(savedAssignment));

            const { User } = await import('../../src/models/User.js');
            vi.spyOn(User, 'findByIdAndUpdate').mockReturnValue(Promise.resolve());

            await createAssignment(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Assignment created successfully." });
        });
    });

    describe('updateAssignment', () => {
        it('should fail for invalid assignment ID', async () => {
            const req = createReq({ assignmentId: 'invalid-id' }, { title: 'Updated Assignment Title' });
            const res = createMockRes();

            await updateAssignment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid assignment ID" });
        });

        it('should fail for non-existent assignment', async () => {
            const req = createReq({ assignmentId: validObjectId }, { title: 'Updated Assignment Title' });
            const res = createMockRes();

            vi.spyOn(Assignment, 'findOneAndUpdate').mockReturnValue(Promise.resolve(null));
            await updateAssignment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Assignment not found" });
        });

        it('should update an existing assignment for the authenticated user', async () => {
            const req = createReq({ assignmentId: validObjectId }, { title: 'Updated Assignment Title' });
            const res = createMockRes();

            const updatedAssignment = mockAssignment({ title: 'Updated Assignment Title' });
            vi.spyOn(Assignment, 'findOneAndUpdate').mockReturnValue(Promise.resolve(updatedAssignment));

            await updateAssignment(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Assignment updated successfully." });
        });

        it('should update multiple fields of an existing assignment', async () => {
            const req = createReq({ assignmentId: validObjectId }, {
                title: 'Updated Assignment Title',
                step: 2,
                prompt: 'Updated Prompt',
                startSmall: false,
                writingGoals: ['Updated Goal 1', 'Updated Goal 2'],
                smallAnswers: ['Updated Answer 1'],
                bigAnswer: 'Updated Big Answer',
            });

            const res = createMockRes();

            const updatedAssignment = mockAssignment({
                title: 'Updated Assignment Title',
                step: 2,
                prompt: 'Updated Prompt',
                startSmall: false,
                writingGoals: ['Updated Goal 1', 'Updated Goal 2'],
                smallAnswers: ['Updated Answer 1'],
                bigAnswer: 'Updated Big Answer',
            });

            vi.spyOn(Assignment, 'findOneAndUpdate').mockReturnValue(Promise.resolve(updatedAssignment));

            await updateAssignment(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Assignment updated successfully." });
        });
    });

    describe('deleteAssignment', () => {
        it('should fail for invalid assignment ID', async () => {
            const req = createReq({ assignmentId: 'invalid-id' });
            const res = createMockRes();

            await deleteAssignment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid assignment ID" });
        });

        it('should fail for non-existent assignment', async () => {
            const req = createReq({ assignmentId: validObjectId });
            const res = createMockRes();

            vi.spyOn(Assignment, 'findByIdAndDelete').mockReturnValue(Promise.resolve(null));

            await deleteAssignment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Assignment not found" });
        });

        it('should delete an existing assignment for the authenticated user', async () => {
            const req = createReq({ assignmentId: validObjectId });
            const res = createMockRes();

            vi.spyOn(Assignment, 'findByIdAndDelete').mockReturnValue(Promise.resolve(mockAssignment()));

            const { User } = await import('../../src/models/User.js');
            vi.spyOn(User, 'findByIdAndUpdate').mockReturnValue(Promise.resolve({}));

            await deleteAssignment(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: "Assignment deleted successfully." });
        });
    });
});