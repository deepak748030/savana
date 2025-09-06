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
            postalCode: { type: String, required: true },
            Landmark: { type: String, required: false },
            AlternateMobile: { type: String, required: false },
            Email: { type: String, required: false }
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

        // New field for order status
        orderStatus: {
            type: String,
            enum: ['pending', 'ordered', 'shipped', 'order delayed', 'delivered'],
            default: 'pending'
        },

        totalAmount: {
            type: Number,
            required: true
        },
        // Field for tree donation
        donationAmount: {
            type: Number,
            default: 0
        },

        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },

        isCancelled: { type: Boolean, default: false },
        cancelledAt: { type: Date },

        razorpayOrderId: { type: String, default: null },
        razorpayPaymentId: { type: String, default: null },

        // Shiprocket Integration Fields
        shiprocketOrderId: { type: String, default: null },
        shiprocketOrderDate: { type: String, default: null },
        shiprocketShipmentId: { type: String, default: null },
        shiprocketCourierId: { type: String, default: null },
        shiprocketAWBNumber: { type: String, default: null },
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
