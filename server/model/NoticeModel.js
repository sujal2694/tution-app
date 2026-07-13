import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

export const noticeModel = mongoose.models.model || mongoose.model('Notice', NoticeSchema);