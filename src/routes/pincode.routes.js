import express from 'express';
import {
    createPincode,
    getAllPincodes,
    updatePincode,
    deletePincode,
    checkPincodeAvailability
} from '../controllers/pincode.controller.js';

const router = express.Router();

router.post('/', createPincode);             // ✅ Create
router.get('/', getAllPincodes);             // ✅ Get all
router.patch('/:id', updatePincode);         // ✅ Update
router.delete('/:id', deletePincode);        // ✅ Delete
router.post('/check', checkPincodeAvailability); // ✅ Check if available

export default router;
/**
 * @swagger
 * tags:
 *   name: Pincode
 *   description: Pincode management and availability check
 */

/**
 * @swagger
 * /api/pincodes:
 *   post:
 *     summary: Create a new pincode
 *     tags: [Pincode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pincode
 *             properties:
 *               pincode:
 *                 type: string
 *                 example: "462001"
 *     responses:
 *       201:
 *         description: Pincode created successfully
 *       400:
 *         description: Pincode is required
 *       500:
 *         description: Failed to create pincode
 */

/**
 * @swagger
 * /api/pincodes:
 *   get:
 *     summary: Get all pincodes
 *     tags: [Pincode]
 *     responses:
 *       200:
 *         description: List of pincodes fetched
 *       500:
 *         description: Failed to fetch pincodes
 */

/**
 * @swagger
 * /api/pincodes/{id}:
 *   patch:
 *     summary: Update a pincode
 *     tags: [Pincode]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Pincode ID (MongoDB ID)
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pincode:
 *                 type: string
 *                 example: "462002"
 *     responses:
 *       200:
 *         description: Pincode updated successfully
 *       404:
 *         description: Pincode not found
 *       500:
 *         description: Update failed
 */

/**
 * @swagger
 * /api/pincodes/{id}:
 *   delete:
 *     summary: Delete a pincode
 *     tags: [Pincode]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Pincode ID (MongoDB ID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pincode deleted successfully
 *       404:
 *         description: Pincode not found
 *       500:
 *         description: Delete failed
 */
/**
 * @swagger
 * /api/pincodes/check:
 *   post:
 *     summary: Check if a pincode is available
 *     tags: [Pincode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pincode
 *             properties:
 *               pincode:
 *                 type: string
 *                 example: "462001"
 *     responses:
 *       200:
 *         description: Pincode is available
 *       404:
 *         description: Pincode not available
 *       400:
 *         description: Pincode is required
 *       500:
 *         description: Check failed
 */
