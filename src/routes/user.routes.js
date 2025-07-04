import express from 'express';
import upload from '../utils/multer.js';
import {
    signupUser,
    loginUser,
    getAllUsers,
    updateUser,
    verifySignupUser,
    verifyLoginUser
} from '../controllers/user.controller.js';

const router = express.Router();

// 🟢 User Authentication Routes
router.post('/signup', signupUser);             // Step 1: send OTP
router.post('/signup/verify', verifySignupUser); // Step 2: verify OTP & create user

router.post('/login', loginUser);               // Step 1: send OTP
router.post('/login/verify', verifyLoginUser);   // Step 2: verify OTP & return user
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
 *     summary: Send OTP for signup
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
 *         description: OTP sent for signup
 *       400:
 *         description: Invalid phone number
 *       409:
 *         description: User already exists
 *       500:
 *         description: Failed to send OTP
 */

/**
 * @swagger
 * /api/users/signup/verify:
 *   post:
 *     summary: Verify OTP and create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: OTP expired or not found
 *       401:
 *         description: Invalid OTP
 *       409:
 *         description: User already exists
 *       500:
 *         description: Signup verification failed
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Send OTP for login
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
 *         description: OTP sent for login
 *       400:
 *         description: Invalid phone number
 *       404:
 *         description: User not found
 *       403:
 *         description: User is blocked
 *       500:
 *         description: Failed to send OTP
 */

/**
 * @swagger
 * /api/users/login/verify:
 *   post:
 *     summary: Verify OTP and log in user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: OTP expired or not found
 *       401:
 *         description: Invalid OTP
 *       403:
 *         description: User is blocked
 *       404:
 *         description: User not found
 *       500:
 *         description: Login verification failed
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
 *       500:
 *         description: Fetch failed
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
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *     requestBody:
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
 *       500:
 *         description: Update failed
 */
