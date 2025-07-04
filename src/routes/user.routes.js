import express from 'express';
import upload from '../utils/multer.js';
import {
    signupUser,
    loginUser,
    getAllUsers,
    updateUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.patch('/:id', upload.single('avatar'), updateUser);

export default router;


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Signup using phone number
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       201:
 *         description: User signed up successfully
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login using phone number
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB user ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
