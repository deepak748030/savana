import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product', // adjust this name if your model is different
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // adjust as needed
        },
        image: {
            type: String,
        },
        commentMsg: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
