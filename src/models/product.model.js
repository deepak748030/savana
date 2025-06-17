import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    images: [{ type: String }],
    amount: { type: Number, required: true },
    discountedAmount: { type: Number },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
