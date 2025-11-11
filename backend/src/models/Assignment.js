import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    step: {
        type: Number,
        default: 1,
    },
    prompt: {
        type: String,
    },
    startSmall: {
        type: Boolean,
        default: true,
    },
    writingGoals: {
        type: [String],
    },
    smallAnswers: {
        type: [String],
    },
    bigAnswer: {
        type: String,
    },
    topicIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Topic',
    },
    topicNames: {
        type: [String],
    }
}, { timestamps: true });

export const Assignment = mongoose.model('Assignment', assignmentSchema);