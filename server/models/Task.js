import mongoose from 'mongoose';

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subtasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtask"
    }],
    views: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Member'
    },
    date: {
        type: String,
        required: true
    }
},
    { timestamps: true })

export default mongoose.model('Task', Task);