import Order from '../models/product.order.model.js';
import Product from '../models/product.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// ✅ Create Order with totalAmount calculation
export const createOrder = async (req, res) => {
    try {
        const {
            user,
            products,
            shippingAddress,
            paymentMethod = 'cod',
            paymentStatus = 'pending', // Add this
            razorpayOrderId, // Add this
            razorpayPaymentId, // Add this
        } = req.body;

        if (!user || !products || products.length === 0 || !shippingAddress) {
            return sendResponse(res, 400, false, 'Missing required fields');
        }

        let totalAmount = 0;

        // Calculate totalAmount based on product pricing
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return sendResponse(res, 404, false, `Product not found: ${item.product}`);
            }

            const price = product.discountedAmount ?? product.amount;
            totalAmount += price * item.quantity;
        }

        const order = await Order.create({
            user,
            products,
            shippingAddress,
            paymentMethod,
            paymentStatus,
            totalAmount,
            razorpayOrderId, // Add this
            razorpayPaymentId, // Add this
        });

        return sendResponse(res, 201, true, 'Order created successfully', order);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Failed to create order', err.message);
    }
};

// ✅ Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('products.product')
            .populate('products.productVariant');

        return sendResponse(res, 200, true, 'Orders fetched successfully', orders);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Failed to fetch orders', err.message);
    }
};

// ✅ Get Order By ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('user', 'name email')
            .populate('products.product', 'title images')
            .populate('products.productVariant');

        if (!order) return sendResponse(res, 404, false, 'Order not found');

        return sendResponse(res, 200, true, 'Order fetched successfully', order);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Failed to fetch order', err.message);
    }
};

// ✅ Mark as Delivered
export const markOrderDelivered = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) return sendResponse(res, 404, false, 'Order not found');

        order.isDelivered = true;
        order.deliveredAt = new Date();
        await order.save();

        return sendResponse(res, 200, true, 'Order marked as delivered', order);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Failed to update delivery status', err.message);
    }
};

// ✅ Cancel Order
export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) return sendResponse(res, 404, false, 'Order not found');

        order.isCancelled = true;
        order.cancelledAt = new Date();
        await order.save();

        return sendResponse(res, 200, true, 'Order cancelled', order);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Failed to cancel order', err.message);
    }
};

// ✅ Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) return sendResponse(res, 404, false, 'Order not found');

        return sendResponse(res, 200, true, 'Order deleted successfully', order);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Failed to delete order', err.message);
    }
};

// ✅ Get Orders by User ID
export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user: userId })
            .populate('user', 'name email')
            .populate('products.product', 'title images')
            .populate('products.productVariant', 'colorCode');

        if (!orders || orders.length === 0) {
            return sendResponse(res, 404, false, 'No orders found for this user');
        }

        return sendResponse(res, 200, true, 'User orders fetched successfully', orders);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Failed to fetch user orders', err.message);
    }
};
