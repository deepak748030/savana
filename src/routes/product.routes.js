import express from 'express';
import upload from '../utils/multer.js';
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    getProductById
} from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', upload.array('images', 5), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.array('images', 5), updateProduct);
router.delete('/:id', deleteProduct);
router.get('/search', searchProducts);
router.get('/category/:categoryId', getProductsByCategory);

export default router;


/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management APIs
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - amount
 *               - category
 *               - stockCount
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               discountedAmount:
 *                 type: number
 *               category:
 *                 type: string
 *                 description: MongoDB ObjectId for category
 *               stockCount:
 *                 type: number
 *               inStock:
 *                 type: boolean
 *               fastDelivery:
 *                 type: boolean
 *               tag:
 *                 type: string
 *                 example: "bestseller"
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "L"
 *               productInfo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details fetched
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               discountedAmount:
 *                 type: number
 *               category:
 *                 type: string
 *               stockCount:
 *                 type: number
 *               inStock:
 *                 type: boolean
 *               fastDelivery:
 *                 type: boolean
 *               tag:
 *                 type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *               productInfo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products by title
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search text to filter product titles
 *     responses:
 *       200:
 *         description: Search results returned
 */

/**
 * @swagger
 * /api/products/category/{categoryId}:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB category ObjectId
 *     responses:
 *       200:
 *         description: Products fetched for given category
 *       404:
 *         description: Category or products not found
 */
