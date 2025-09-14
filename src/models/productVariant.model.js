import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    colorCode: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false,
        // default: 0
    },
    images: [{
        type: String
    }]
}, { timestamps: true });

export default mongoose.model('ProductVariant', productVariantSchema);
