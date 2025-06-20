import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            enum: ['single', 'multiple'],
            required: true
        },
        images: {
            type: [String], // Always stored as array for simplicity
            required: true,
            validate: {
                validator: function (v) {
                    return Array.isArray(v) && v.length > 0;
                },
                message: 'At least one image is required.'
            }
        }
    },
    { timestamps: true }
);

export default mongoose.model('Poster', posterSchema);
