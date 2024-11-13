import mongoose from 'mongoose';


const Project = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    member: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    filter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filter'
    }],
    inviteUrl: [{
        type: String,
        ref: 'inviteUrl'
    }]
},
    { timestamps: true })

export default mongoose.model('Project', Project);