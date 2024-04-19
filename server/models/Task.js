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
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    date: {
        type: String,
        required: true
    }
},
    { timestamps: true })

export default mongoose.model('Task', Task);