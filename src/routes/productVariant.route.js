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
 *     summary: Create a product variant with color and images
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
 *               colorCode:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Variant created successfully
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
 *     responses:
 *       200:
 *         description: List of variants for the given product
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
 *     responses:
 *       200:
 *         description: Variant details
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
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               colorCode:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Variant updated successfully
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
 *     responses:
 *       200:
 *         description: Variant deleted successfully
 */

