import mongoose from 'mongoose';

const Task = new mongoose.Schema({
    project: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'todo'
    },
    filters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Filter"
    }],
    subtasks: [{
        description: {
            type: String,
            require: true
        },
        status: {
            type: Boolean,
            default: false
        }
    }],
    views: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Member'
    },
    date: {
        type: Date,
        required: true
    }
},
    { timestamps: true })

export default mongoose.model('Task', Task);