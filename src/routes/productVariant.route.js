import express from 'express';
import upload from '../utils/multer.js';
import {
    createProductVariant,
    getVariantsByProductId,
    getVariantById,
    updateVariant,
    deleteVariant
} from '../controllers/productVariant.controller.js';

const router = express.Router();

router.post('/', upload.array('images', 6), createProductVariant);
router.get('/product/:productId', getVariantsByProductId);
router.get('/:id', getVariantById);
router.put('/:id', upload.array('images', 6), updateVariant);
router.delete('/:id', deleteVariant);

export default router;


/**
 * @swagger
 * tags:
 *   name: ProductVariant
 *   description: Product variant (color & images) management
 */

/**
 * @swagger
 * /api/product-variants:
 *   post:
 *     summary: Create a product variant with color, price, and images
 *     tags: [ProductVariant]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the parent product.
 *                 example: 60d0fe4f5ae1a60015a0b3c1
 *               colorCode:
 *                 type: string
 *                 description: The color code for the variant (e.g., #FF0000).
 *                 example: "#FF0000"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of this specific product variant.
 *                 example: 29.99
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files for the variant.
 *     responses:
 *       201:
 *         description: Variant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Variant created successfully
 *                 data:
 *                   $ref: '#/components/schemas/ProductVariant'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-variants/product/{productId}:
 *   get:
 *     summary: Get all variants by product ID
 *     tags: [ProductVariant]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *         example: 60d0fe4f5ae1a60015a0b3c1
 *     responses:
 *       200:
 *         description: List of variants for the given product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Variants fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductVariant'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-variants/{id}:
 *   get:
 *     summary: Get a single variant by ID
 *     tags: [ProductVariant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant ID
 *         example: 60d0fe4f5ae1a60015a0b3c2
 *     responses:
 *       200:
 *         description: Variant details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Variant fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/ProductVariant'
 *       404:
 *         description: Variant not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-variants/{id}:
 *   put:
 *     summary: Update a product variant
 *     tags: [ProductVariant]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant ID
 *         example: 60d0fe4f5ae1a60015a0b3c2
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               colorCode:
 *                 type: string
 *                 description: The new color code for the variant.
 *                 example: "#0000FF"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The new price of this specific product variant.
 *                 example: 34.99
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: New array of image files for the variant.
 *     responses:
 *       200:
 *         description: Variant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Variant updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/ProductVariant'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Variant not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-variants/{id}:
 *   delete:
 *     summary: Delete a product variant
 *     tags: [ProductVariant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant ID
 *         example: 60d0fe4f5ae1a60015a0b3c2
 *     responses:
 *       200:
 *         description: Variant deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Variant deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/ProductVariant'
 *       404:
 *         description: Variant not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductVariant:
 *       type: object
 *       required:
 *         - productId
 *         - colorCode
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the product variant.
 *           example: 60d0fe4f5ae1a60015a0b3c2
 *         productId:
 *           type: string
 *           description: The ID of the parent product.
 *           example: 60d0fe4f5ae1a60015a0b3c1
 *         colorCode:
 *           type: string
 *           description: The color code for the variant (e.g., #FF0000).
 *           example: "#FF0000"
 *         price:
 *           type: number
 *           format: float
 *           description: The price of this specific product variant.
 *           example: 29.99
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of images for this variant.
 *           example: ["/uploads/image1.jpg", "/uploads/image2.jpg"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the variant was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the variant was last updated.
 */
