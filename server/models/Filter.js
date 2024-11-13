import mongoose from 'mongoose';

const Filter = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    backgroundColor: {
        type: String,
        required: true,
    },
    textColor: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
},)

export default mongoose.model('Filter', Filter); 