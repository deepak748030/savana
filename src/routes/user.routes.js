import express from 'express';
import {
    createUser,
    getAllUsers,
    updateUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               avatar:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *               isBlocked:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User created
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *               isBlocked:
 *                 type: boolean
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
