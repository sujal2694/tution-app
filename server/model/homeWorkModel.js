import mongoose from 'mongoose';

const homeWorkSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export const homeWorkModel = mongoose.models.model || mongoose.model('homeWork', homeWorkSchema);