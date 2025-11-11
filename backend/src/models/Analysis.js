import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    associatedEvidenceIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Evidence',
    },
}, { timestamps: true });

export const Analysis = mongoose.model('Analysis', analysisSchema);