import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: [true, 'Full name is required']
        },

        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: [true, 'Email is required'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address'
            ]
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },

        avatar: {
            type: String,
            default: ''
        },

        phone: {
            type: String,
            match: [/^\d{10}$/, 'Phone number must be 10 digits']
        },

        address: {
            type: String,
            default: ''
        },

        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);
