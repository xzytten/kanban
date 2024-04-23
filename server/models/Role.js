import mongoose from 'mongoose';

const Role = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
},)

export default mongoose.model('Role', Role); 