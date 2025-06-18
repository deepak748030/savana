import User from '../models/user.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        sendResponse(res, 201, 'User created successfully', user);
    } catch (error) {
        sendResponse(res, 500, 'Error creating user', error.message);
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        sendResponse(res, 200, 'All users fetched successfully', users);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching users', error.message);
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return sendResponse(res, 404, 'User not found');
        }

        sendResponse(res, 200, 'User updated successfully', updated);
    } catch (error) {
        sendResponse(res, 500, 'Error updating user', error.message);
    }
};