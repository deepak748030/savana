import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    images: [{ type: String }],
    amount: { type: Number, required: true },
    discountedAmount: { type: Number },
    stockCount: { type: Number, required: true, default: 0 }, // ✅ stock quantity field

    inStock: { type: Boolean, default: true }, // can be controlled via logic in controller
    fastDelivery: { type: Boolean, default: false },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
