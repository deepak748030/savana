import User from '../models/user.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// ✅ Signup - mobile only
export const signupUser = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone || !/^\d{10}$/.test(phone)) {
            return sendResponse(res, 400, false, 'Valid 10-digit phone number required');
        }

        const existing = await User.findOne({ phone });
        if (existing) {
            return sendResponse(res, 409, false, 'User already exists');
        }

        const newUser = await User.create({ phone });
        return sendResponse(res, 201, true, 'Signup successful', newUser);
    } catch (err) {
        return sendResponse(res, 500, false, 'Signup failed', err.message);
    }
};

// ✅ Login - mobile only
export const loginUser = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone || !/^\d{10}$/.test(phone)) {
            return sendResponse(res, 400, false, 'Valid 10-digit phone number required');
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return sendResponse(res, 404, false, 'User not found');
        }

        if (user.isBlocked) {
            return sendResponse(res, 403, false, 'User is blocked');
        }

        return sendResponse(res, 200, true, 'Login successful', user);
    } catch (err) {
        return sendResponse(res, 500, false, 'Login failed', err.message);
    }
};

// ✅ Get all users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        return sendResponse(res, 200, true, 'Users fetched', users);
    } catch (err) {
        return sendResponse(res, 500, false, 'Fetch failed', err.message);
    }
};

// ✅ Update profile (avatar + all info)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

        const update = {
            ...req.body,
            ...(avatar && { avatar })
        };

        const updated = await User.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true
        });

        if (!updated) return sendResponse(res, 404, false, 'User not found');

        return sendResponse(res, 200, true, 'User updated', updated);
    } catch (err) {
        return sendResponse(res, 500, false, 'Update failed', err.message);
    }
};
