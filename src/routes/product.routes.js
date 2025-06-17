import express from 'express';
import upload from '../utils/multer.js';
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory
} from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', upload.array('images', 5), createProduct); // max 5 images
router.get('/', getAllProducts);
router.put('/:id', upload.array('images', 5), updateProduct);
router.delete('/:id', deleteProduct);
router.get('/search', searchProducts); // 🔍 /api/products/search?query=apple
router.get('/category/:categoryId', getProductsByCategory); // 📦 /api/products/category/<id>


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
 *                 description: MongoDB category ObjectId
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created
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
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
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
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated
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
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted
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
 *         schema:
 *           type: string
 *         required: true
 *         description: Text to search in product titles
 *     responses:
 *       200:
 *         description: Search results
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
 *         description: MongoDB ObjectId of the category
 *     responses:
 *       200:
 *         description: List of products in the category
 */
