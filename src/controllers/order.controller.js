import Order from '../models/product.model.js';
import { sendResponse } from '../utils/sendResponse.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
    try {
        const { user, products, ...rest } = req.body;

        // Validate and populate each product's data
        const populatedProducts = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.product);

                if (!product) throw new Error(`Product not found: ${item.product}`);

                return {
                    product: product._id,
                    quantity: item.quantity,
                    title: product.title,
                    amount: product.amount,
                    discountedAmount: product.discountedAmount,
                    image: product.images?.[0] || null
                };
            })
        );

        // Create the order with populated product info
        const order = await Order.create({
            user,
            products: populatedProducts,
            ...rest
        });

        sendResponse(res, 201, 'Order created', order);
    } catch (err) {
        console.error(err);
        sendResponse(res, 500, 'Error creating order', err.message);
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('products.product', 'title amount');
        sendResponse(res, 200, 'Orders fetched', orders);
    } catch (err) {
        sendResponse(res, 500, 'Error fetching orders', err.message);
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('products.product', 'title amount');
        if (!order) return sendResponse(res, 404, 'Order not found');
        sendResponse(res, 200, 'Order fetched', order);
    } catch (err) {
        sendResponse(res, 500, 'Error fetching order', err.message);
    }
};

export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user: userId })
            .populate('products.product', 'title amount discountedAmount')
            .sort({ createdAt: -1 });

        if (!orders.length) {
            return sendResponse(res, 404, 'No orders found for this user');
        }

        return sendResponse(res, 200, 'User orders fetched successfully', orders);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, 'Failed to fetch orders');
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { isDelivered, isCancelled, paymentStatus } = req.body;
        const updateFields = {};
        if (isDelivered !== undefined) {
            updateFields.isDelivered = isDelivered;
            updateFields.deliveredAt = isDelivered ? new Date() : null;
        }
        if (isCancelled !== undefined) {
            updateFields.isCancelled = isCancelled;
            updateFields.cancelledAt = isCancelled ? new Date() : null;
        }
        if (paymentStatus) updateFields.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
            new: true
        });

        if (!order) return sendResponse(res, 404, 'Order not found');
        sendResponse(res, 200, 'Order updated', order);
    } catch (err) {
        sendResponse(res, 500, 'Error updating order', err.message);
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return sendResponse(res, 404, 'Order not found');
        sendResponse(res, 200, 'Order deleted');
    } catch (err) {
        sendResponse(res, 500, 'Error deleting order', err.message);
    }
};
