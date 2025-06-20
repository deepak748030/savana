import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    images: [{ type: String }],
    amount: { type: Number, required: true },
    discountedAmount: { type: Number },
    stockCount: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, default: true },
    fastDelivery: { type: Boolean, default: false },

    sizes: [{ type: String }], // ✅ sizes like XS, S, M, L, XL

    productInfo: [
        {
            title: { type: String, required: true },
            content: { type: String, required: true }
        }
    ], // ✅ structured product details

    tag: { type: String }, // ✅ Added tag field (e.g. "bestseller", "new", etc.)

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
