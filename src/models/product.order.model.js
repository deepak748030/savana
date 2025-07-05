import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                productVariant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'ProductVariant',
                    required: true
                },
                size: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true }
        },

        paymentMethod: {
            type: String,
            enum: ['cod', 'razorpay', 'stripe', 'paypal'],
            default: 'cod'
        },

        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending'
        },

        totalAmount: {
            type: Number,
            required: true
        },

        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },

        isCancelled: { type: Boolean, default: false },
        cancelledAt: { type: Date }
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
