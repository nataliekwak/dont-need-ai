import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    publicationDate: {
        type: Date,
    },
    url: {
        type: String,
    },
    evidenceIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Evidence',
    },
}, { timestamps: true });

export const Source = mongoose.model('Source', sourceSchema);