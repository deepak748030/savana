import express from 'express';
import upload from '../utils/multer.js';
import {
    createPoster,
    getPostersByName,
    updatePoster,
    deletePoster
} from '../controllers/poster.controller.js';

const router = express.Router();

router.post('/', upload.array('images', 10), createPoster);
router.get('/:name', getPostersByName);
router.put('/:id', upload.array('images', 10), updatePoster);
router.delete('/:id', deletePoster);

export default router;
/**
 * @swagger
 * tags:
 *   name: Poster
 *   description: Poster management APIs
 */

/**
 * @swagger
 * /api/posters:
 *   post:
 *     summary: Create a new poster
 *     tags: [Poster]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - images
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [single, multiple]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Poster created successfully
 */

/**
 * @swagger
 * /api/posters/{name}:
 *   get:
 *     summary: Get posters by name
 *     tags: [Poster]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Poster name to search
 *     responses:
 *       200:
 *         description: Posters fetched successfully
 */

/**
 * @swagger
 * /api/posters/{id}:
 *   put:
 *     summary: Update a poster by ID
 *     tags: [Poster]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [single, multiple]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Poster updated successfully
 */

/**
 * @swagger
 * /api/posters/{id}:
 *   delete:
 *     summary: Delete a poster by ID
 *     tags: [Poster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Poster deleted successfully
 */
