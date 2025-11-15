import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Note', 'Direct Quote', 'Paraphrase'],
    },
    content: {
        type: String,
        required: true,
    },
    associatedAnalysisIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Analysis',
    },
}, { timestamps: true });

export const Evidence = mongoose.model('Evidence', evidenceSchema);