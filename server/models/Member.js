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
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }]
},
    { timestamps: true })

export default mongoose.model('Member', Member);