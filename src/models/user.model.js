import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            unique: true,
            required: [true, 'Phone number is required'],
            match: [/^\d{10}$/, 'Phone number must be 10 digits']
        },
        avatar: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
