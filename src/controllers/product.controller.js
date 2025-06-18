import Product from '../models/product.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// Create a product
export const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            amount,
            discountedAmount,
            category,
            inStock,
            fastDelivery = false,
            stockCount = 0
        } = req.body;

        if (!title || !amount || !category) {
            return sendResponse(res, 400, false, 'Missing required fields');
        }

        const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

        const product = await Product.create({
            title,
            description,
            amount,
            discountedAmount,
            category,
            stockCount: Number(stockCount),
            inStock: inStock === 'true' || inStock === true || Number(stockCount) > 0,
            fastDelivery: fastDelivery === 'true' || fastDelivery === true,
            images
        });

        return sendResponse(res, 201, true, 'Product created successfully', product);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        return sendResponse(res, 200, true, 'Products fetched', products);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findById(id);
        if (!product) return sendResponse(res, 404, false, 'Product not found');

        if (req.files?.length > 0) {
            product.images = req.files.map(file => `/uploads/${file.filename}`);
        }

        // Update fields safely
        Object.keys(updates).forEach(key => {
            if (key === 'stockCount') {
                product.stockCount = Number(updates[key]);
                product.inStock = product.stockCount > 0;
            } else if (key === 'inStock') {
                product.inStock = updates.inStock === 'true' || updates.inStock === true;
            } else if (key === 'fastDelivery') {
                product.fastDelivery = updates.fastDelivery === 'true' || updates.fastDelivery === true;
            } else {
                product[key] = updates[key];
            }
        });

        await product.save();
        return sendResponse(res, 200, true, 'Product updated', product);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) return sendResponse(res, 404, false, 'Product not found');
        return sendResponse(res, 200, true, 'Product deleted', product);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// Search by title
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return sendResponse(res, 400, false, 'Query is required');

        const products = await Product.find({
            title: { $regex: query, $options: 'i' }
        }).populate('category');

        return sendResponse(res, 200, true, 'Search results', products);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

// Get by category
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate('category');
        return sendResponse(res, 200, true, 'Products by category', products);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};
