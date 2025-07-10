import Pincode from '../models/pincode.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// ✅ Create
export const createPincode = async (req, res) => {
    try {
        const { pincode } = req.body;
        if (!pincode) return sendResponse(res, 400, false, 'Pincode is required');

        const newPincode = await Pincode.create({ pincode });
        return sendResponse(res, 201, true, 'Pincode created successfully', newPincode);
    } catch (err) {
        return sendResponse(res, 500, false, 'Failed to create pincode', err.message);
    }
};

// ✅ Get All
export const getAllPincodes = async (_req, res) => {
    try {
        const pincodes = await Pincode.find().sort({ createdAt: -1 });
        return sendResponse(res, 200, true, 'Pincodes fetched', pincodes);
    } catch (err) {
        return sendResponse(res, 500, false, 'Failed to fetch pincodes', err.message);
    }
};

// ✅ Update
export const updatePincode = async (req, res) => {
    try {
        const { id } = req.params;
        const { pincode } = req.body;

        const updated = await Pincode.findByIdAndUpdate(id, { pincode }, { new: true });
        if (!updated) return sendResponse(res, 404, false, 'Pincode not found');

        return sendResponse(res, 200, true, 'Pincode updated', updated);
    } catch (err) {
        return sendResponse(res, 500, false, 'Update failed', err.message);
    }
};

// ✅ Delete
export const deletePincode = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Pincode.findByIdAndDelete(id);
        if (!deleted) return sendResponse(res, 404, false, 'Pincode not found');

        return sendResponse(res, 200, true, 'Pincode deleted', deleted);
    } catch (err) {
        return sendResponse(res, 500, false, 'Delete failed', err.message);
    }
};

// ✅ Check if Pincode Available
export const checkPincodeAvailability = async (req, res) => {
    try {
        const { pincode } = req.body;

        const exists = await Pincode.findOne({ pincode });
        if (!exists) {
            return sendResponse(res, 404, false, 'Pincode not available');
        }

        return sendResponse(res, 200, true, 'Pincode is available', exists);
    } catch (err) {
        return sendResponse(res, 500, false, 'Check failed', err.message);
    }
};
