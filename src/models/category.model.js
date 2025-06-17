import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: '',
    }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
