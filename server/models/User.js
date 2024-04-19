import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: '',
    },
    project: {
        
    }
},
    { timestamps: true })

export default mongoose.model('User', User);