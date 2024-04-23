import mongoose from 'mongoose';

const Subtask = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    status: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    }
},
    { timestamps: true })

export default mongoose.model('Subtask', Subtask);