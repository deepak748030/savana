import express from 'express';
import upload from '../utils/multer.js';
import {
    createComment,
    getCommentsByProductId,
    updateComment,
    deleteComment
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/', upload.single('image'), createComment); // image is optional
router.get('/:productId', getCommentsByProductId);
router.put('/:id', upload.single('image'), updateComment);
router.delete('/:id', deleteComment);

export default router;
/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Product comment APIs
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a comment on a product
 *     tags: [Comment]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - userId
 *               - commentMsg
 *             properties:
 *               productId:
 *                 type: string
 *               userId:
 *                 type: string
 *               commentMsg:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Comment created successfully
 */

/**
 * @swagger
 * /api/comments/{productId}:
 *   get:
 *     summary: Get comments by product ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comment]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               commentMsg:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Comment updated successfully
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */
