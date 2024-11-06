import mongoose from 'mongoose';

const Filter = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
},)

export default mongoose.model('Filter', Filter); 