import mongoose from 'mongoose';
import Role from './Role';

const Member = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    img: {
        type: String,
        default: '',
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