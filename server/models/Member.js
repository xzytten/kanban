import mongoose from 'mongoose';

const Member = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    position: {
        type: String,
        default: 'guest'
    },
    solved: {
        type: Number,
        default: 0
    },
    notInTime: {
        type: Number,
        default: 0
    },
    filters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filter'
    }]
},
    { timestamps: true })

export default mongoose.model('Member', Member);