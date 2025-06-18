import ProductVariant from '../models/productVariant.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// Create
export const createProductVariant = async (req, res) => {
    try {
        const { productId, colorCode } = req.body;
        if (!productId || !colorCode) {
            return sendResponse(res, 400, false, 'productId and colorCode are required');
        }

        const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

        const variant = await ProductVariant.create({ productId, colorCode, images });
        return sendResponse(res, 201, true, 'Variant created successfully', variant);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error creating variant', error.message);
    }
};

// Get all variants of a product
export const getVariantsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const variants = await ProductVariant.find({ productId });
        return sendResponse(res, 200, true, 'Variants fetched successfully', variants);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error fetching variants', error.message);
    }
};

// Get single variant by variant ID
export const getVariantById = async (req, res) => {
    try {
        const { id } = req.params;
        const variant = await ProductVariant.findById(id);
        if (!variant) return sendResponse(res, 404, false, 'Variant not found');
        return sendResponse(res, 200, true, 'Variant fetched successfully', variant);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error fetching variant', error.message);
    }
};

// Update
export const updateVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const variant = await ProductVariant.findById(id);
        if (!variant) return sendResponse(res, 404, false, 'Variant not found');

        if (req.files?.length > 0) {
            variant.images = req.files.map(file => `/uploads/${file.filename}`);
        }

        Object.keys(updates).forEach(key => {
            variant[key] = updates[key];
        });

        await variant.save();
        return sendResponse(res, 200, true, 'Variant updated successfully', variant);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error updating variant', error.message);
    }
};

// Delete
export const deleteVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductVariant.findByIdAndDelete(id);
        if (!deleted) return sendResponse(res, 404, false, 'Variant not found');
        return sendResponse(res, 200, true, 'Variant deleted successfully', deleted);
    } catch (error) {
        return sendResponse(res, 500, false, 'Error deleting variant', error.message);
    }
};
