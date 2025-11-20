import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    topicSentence: {
        type: String,
        default: "",
    },
    sourceIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Source',
    },
    analysisIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Analysis',
    }
}, { timestamps: true });

export const Topic = mongoose.model('Topic', topicSchema);