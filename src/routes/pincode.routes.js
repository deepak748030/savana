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
router.get('/', getAllPincodes);             // ✅ Get all (Modified for Shiprocket serviceability)
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
 *     summary: Get all pincodes and optionally check Shiprocket serviceability
 *     tags: [Pincode]
 *     parameters:
 *       - in: query
 *         name: pickup_postcode
 *         schema:
 *           type: string
 *         description: Pickup postcode for Shiprocket serviceability check. Required if delivery_postcode is provided.
 *         example: "475661"
 *       - in: query
 *         name: delivery_postcode
 *         schema:
 *           type: string
 *         description: Delivery postcode for Shiprocket serviceability check. Required if pickup_postcode is provided.
 *         example: "475682"
 *       - in: query
 *         name: cod
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Cash on Delivery availability (0 for No, 1 for Yes). Defaults to 1.
 *         example: 1
 *       - in: query
 *         name: weight
 *         schema:
 *           type: number
 *           format: float
 *         description: Weight of the package in kg. Defaults to 0.5.
 *         example: 0.5
 *       - in: query
 *         name: length
 *         schema:
 *           type: number
 *           format: float
 *         description: Length of the package in cm. Defaults to 15.
 *         example: 15
 *       - in: query
 *         name: breadth
 *         schema:
 *           type: number
 *           format: float
 *         description: Breadth of the package in cm. Defaults to 10.
 *         example: 10
 *       - in: query
 *         name: height
 *         schema:
 *           type: number
 *           format: float
 *         description: Height of the package in cm. Defaults to 5.
 *         example: 5
 *       - in: query
 *         name: declared_value
 *         schema:
 *           type: number
 *           format: float
 *         description: Declared value of the package. Defaults to 50.
 *         example: 50
 *     responses:
 *       200:
 *         description: List of pincodes fetched, with optional Shiprocket serviceability data
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
 *                   example: "Pincodes fetched"
 *                 data:
 *                   type: object
 *                   properties:
 *                     storedPincodes:
 *                       type: array
 *                       items:
 *                         type: object # Generic object if Pincode schema is not globally defined
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60c72b2f9b1d8b001c8e4d7a"
 *                           pincode:
 *                             type: string
 *                             example: "462001"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     shiprocketServiceability:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         isServiceable:
 *                           type: boolean
 *                           example: true
 *                         estimatedDeliveryDays:
 *                           type: string
 *                           example: "4"
 *                         estimatedDeliveryDate:
 *                           type: string
 *                           example: "Sep 07, 2025"
 *                         couriers:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               courierName:
 *                                 type: string
 *                                 example: "Delhivery Surface"
 *                               estimatedDeliveryDays:
 *                                 type: string
 *                                 example: "4"
 *                               estimatedDeliveryDate:
 *                                 type: string
 *                                 example: "Sep 07, 2025"
 *                               rate:
 *                                 type: number
 *                                 example: 104.45
 *                               codCharges:
 *                                 type: number
 *                                 example: 52
 *                               isSurface:
 *                                 type: boolean
 *                                 example: true
 *                       example:
 *                         isServiceable: true
 *                         estimatedDeliveryDays: "4"
 *                         estimatedDeliveryDate: "Sep 07, 2025"
 *                         couriers:
 *                           - courierName: "Delhivery Surface"
 *                             estimatedDeliveryDays: "4"
 *                             estimatedDeliveryDate: "Sep 07, 2025"
 *                             rate: 104.45
 *                             codCharges: 52
 *                             isSurface: true
 *                           - courierName: "Delhivery Air"
 *                             estimatedDeliveryDays: "4"
 *                             estimatedDeliveryDate: "Sep 07, 2025"
 *                             rate: 105.15
 *                             codCharges: 52.9
 *                             isSurface: false
 *       400:
 *         description: Missing pickup_postcode or delivery_postcode for serviceability check
 *       500:
 *         description: Failed to fetch pincodes or check serviceability
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
 *     summary: Check if a pincode is available in the database
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
