import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    markOrderDelivered,
    cancelOrder,
    deleteOrder,
    trackShipment,
    getShiprocketShipments
} from '../controllers/order.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management endpoints
 *   - name: Shiprocket
 *     description: Shiprocket integration for order fulfillment and tracking
 */

/**
 * @swagger
 * /api/product-orders:
 *   post:
 *     summary: Create a new order (with automatic Shiprocket shipment creation)
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - products
 *               - shippingAddress
 *             properties:
 *               user:
 *                 type: string
 *                 example: "64b7f52feab0f8e3d3b7c123"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - productVariant
 *                     - size
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: "64b7f52feab0f8e3d3b7c111"
 *                     productVariant:
 *                       type: string
 *                       example: "64b7f52feab0f8e3d3b7c112"
 *                     size:
 *                       type: string
 *                       example: "L"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "Deepak Kushwah"
 *                   phone:
 *                     type: string
 *                     example: "9876543210"
 *                   address:
 *                     type: string
 *                     example: "74B Anand Nagar"
 *                   city:
 *                     type: string
 *                     example: "Bhopal"
 *                   state:
 *                     type: string
 *                     example: "Madhya Pradesh"
 *                   postalCode:
 *                     type: string
 *                     example: "462001"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cod, razorpay, stripe, paypal]
 *                 example: razorpay
 *     responses:
 *       201:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /api/product-orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: All orders fetched
 */

/**
 * @swagger
 * /api/product-orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/product-orders/user/{userId}:
 *   get:
 *     summary: Get all orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User's orders fetched
 */

/**
 * @swagger
 * /api/product-orders/{id}/deliver:
 *   put:
 *     summary: Mark an order as delivered
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order marked as delivered
 */

/**
 * @swagger
 * /api/product-orders/{id}/cancel:
 *   put:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order cancelled
 */

/**
 * @swagger
 * /api/product-orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */

/**
 * @swagger
 * /api/product-orders/track/{shippingId}:
 *   get:
 *     summary: Track a shipment via Shiprocket
 *     tags: [Shiprocket]
 *     parameters:
 *       - in: path
 *         name: shippingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Shiprocket Shipment ID
 *     responses:
 *       200:
 *         description: Tracking information retrieved successfully
 *       400:
 *         description: Failed to retrieve tracking information
 */

/**
 * @swagger
 * /api/product-orders/shiprocket/shipments:
 *   get:
 *     summary: Get all shipments from Shiprocket
 *     tags: [Shiprocket]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Shipments retrieved successfully
 *       400:
 *         description: Failed to retrieve shipments
 */

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/user/:userId', getOrdersByUserId);
router.put('/:id/deliver', markOrderDelivered);
router.put('/:id/cancel', cancelOrder);
router.delete('/:id', deleteOrder);

// Shiprocket tracking routes
router.get('/track/:shippingId', trackShipment);
router.get('/shiprocket/shipments', getShiprocketShipments);

export default router;
