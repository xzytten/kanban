import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emeil:{
        type:String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: '',
    },
    project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
},
    { timestamps: true })

export default mongoose.model('User', User);