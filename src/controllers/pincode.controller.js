import Pincode from '../models/pincode.model.js';
import { sendResponse } from '../utils/sendResponse.js';
import shiprocketService from '../services/shiprocket.service.js'; // Import the Shiprocket service

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

        if (!pincode) return sendResponse(res, 400, false, 'Pincode is required for update');

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

// ✅ Check if Pincode Available (Directly checks Shiprocket serviceability and returns estimated delivery days)
export const checkPincodeAvailability = async (req, res) => {
    try {
        const { pincode } = req.body;

        if (!pincode) {
            return sendResponse(res, 400, false, 'Pincode is required');
        }

        // Directly call Shiprocket serviceability API, bypassing local Pincode model check
        const serviceabilityResult = await shiprocketService.checkServiceability(pincode);

        if (serviceabilityResult.success && serviceabilityResult.data && serviceabilityResult.data.data && serviceabilityResult.data.data.available_courier_companies.length > 0) {
            const firstCourier = serviceabilityResult.data.data.available_courier_companies[0];
            const estimatedDeliveryDays = firstCourier.estimated_delivery_days;

            return sendResponse(res, 200, true, 'Pincode is serviceable', {
                pincode: pincode,
                estimatedDeliveryDays: estimatedDeliveryDays
            });
        } else {
            // If no courier companies are available or Shiprocket API indicates non-serviceability
            return sendResponse(res, 404, false, 'Pincode not serviceable by Shiprocket', {
                pincode: pincode,
                message: serviceabilityResult.message || 'No courier companies available for this pincode.'
            });
        }

    } catch (err) {
        console.error('[PincodeController] Error in checkPincodeAvailability:', err.message, err.stack); // Keep critical error logging
        return sendResponse(res, 500, false, 'Check failed', err.message);
    }
};
