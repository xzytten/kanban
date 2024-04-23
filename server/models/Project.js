import mongoose from 'mongoose';


const Project = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
        type: String,
        default: "Maks"
    },
    member: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    role: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }]
},
    { timestamps: true })

export default mongoose.model('Project', Project);