import User from '../models/user.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// Create a new user with avatar image
export const createUser = async (req, res) => {
    try {
        const avatar = req.file ? `/uploads/${req.file.filename}` : null;
        const userData = {
            ...req.body,
            avatar
        };

        const user = await User.create(userData);
        return sendResponse(res, 201, true, 'User created successfully', user);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error creating user', error.message);
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return sendResponse(res, 200, true, 'All users fetched successfully', users);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error fetching users', error.message);
    }
};

// Update user with optional new avatar
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedData = {
            ...req.body,
            ...(avatar && { avatar }) // Only include if a new file is uploaded
        };

        const updated = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return sendResponse(res, 404, false, 'User not found');
        }

        return sendResponse(res, 200, true, 'User updated successfully', updated);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error updating user', error.message);
    }
};
