import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { sendResponse } from '../utils/sendResponse.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

// Create Razorpay order
router.post('/create-razorpay-order', async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount, // amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return sendResponse(res, 200, true, 'Razorpay order created', order);
    } catch (error) {
        console.error('Razorpay order creation failed:', error);
        return sendResponse(res, 500, false, 'Failed to create Razorpay order', error.message);
    }
});

// Verify Razorpay payment
router.post('/verify-razorpay-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            return sendResponse(res, 200, true, 'Payment verified successfully');
        } else {
            return sendResponse(res, 400, false, 'Payment verification failed');
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return sendResponse(res, 500, false, 'Payment verification error', error.message);
    }
});

export default router;