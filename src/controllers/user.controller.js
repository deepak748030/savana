import otpCache from '../utils/otpCache.js';
import { sendOtp, generateOtp } from '../utils/otp.js';
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

        const otp = generateOtp();
        const result = await sendOtp(phone, otp);

        if (!result.status) {
            return sendResponse(res, 500, false, 'Failed to send OTP');
        }

        otpCache.set(`signup:${phone}`, otp); // ⏱ store OTP for 5 mins

        return sendResponse(res, 200, true, 'OTP sent for signup');
    } catch (err) {
        return sendResponse(res, 500, false, 'Signup failed', err.message);
    }
};

export const verifySignupUser = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return sendResponse(res, 400, false, 'Phone and OTP are required');
        }

        const cachedOtp = otpCache.get(`signup:${phone}`);

        if (!cachedOtp) {
            return sendResponse(res, 400, false, 'OTP expired or not found');
        }

        if (cachedOtp.toString() !== otp.toString()) {
            return sendResponse(res, 401, false, 'Invalid OTP');
        }

        const existing = await User.findOne({ phone });
        if (existing) {
            return sendResponse(res, 409, false, 'User already exists');
        }

        const newUser = await User.create({ phone });
        otpCache.del(`signup:${phone}`); // ✅ clean up OTP
        return sendResponse(res, 201, true, 'Signup successful', newUser);
    } catch (err) {
        return sendResponse(res, 500, false, 'Signup verification failed', err.message);
    }
};


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

        const otp = generateOtp();
        const result = await sendOtp(phone, otp);

        if (!result.status) {
            return sendResponse(res, 500, false, 'Failed to send OTP');
        }

        otpCache.set(`login:${phone}`, otp); // Store OTP for login
        return sendResponse(res, 200, true, 'OTP sent for login');
    } catch (err) {
        return sendResponse(res, 500, false, 'Login failed', err.message);
    }
};

export const verifyLoginUser = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return sendResponse(res, 400, false, 'Phone and OTP are required');
        }

        const cachedOtp = otpCache.get(`login:${phone}`);
        if (!cachedOtp) {
            return sendResponse(res, 400, false, 'OTP expired or not found');
        }

        if (cachedOtp.toString() !== otp.toString()) {
            return sendResponse(res, 401, false, 'Invalid OTP');
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return sendResponse(res, 404, false, 'User not found');
        }

        if (user.isBlocked) {
            return sendResponse(res, 403, false, 'User is blocked');
        }

        otpCache.del(`login:${phone}`); // ✅ Remove OTP after successful login
        return sendResponse(res, 200, true, 'Login successful', user);
    } catch (err) {
        return sendResponse(res, 500, false, 'Login verification failed', err.message);
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
