import Product from '../models/product.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// ✅ Create a product
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
            stockCount = 0,
            sizes,
            productInfo,
            tag
        } = req.body;

        if (!title || !amount || !category) {
            return sendResponse(res, 400, false, 'Missing required fields');
        }

        const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

        // ✅ Clean sizes
        const cleanSizes = Array.isArray(sizes)
            ? sizes.map(s => s.replace(/[^a-zA-Z0-9]/g, '')).filter(Boolean)
            : typeof sizes === 'string'
                ? sizes.replace(/[\[\]\\"]/g, '').split(',').map(s => s.trim()).filter(Boolean)
                : [];

        const product = await Product.create({
            title,
            description,
            amount,
            discountedAmount,
            category,
            stockCount: Number(stockCount),
            inStock: inStock === 'true' || inStock === true || Number(stockCount) > 0,
            fastDelivery: fastDelivery === 'true' || fastDelivery === true,
            sizes: cleanSizes,
            productInfo: typeof productInfo === 'string' ? JSON.parse(productInfo) : productInfo,
            tag,
            images
        });

        return sendResponse(res, 201, true, 'Product created successfully', product);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error', err.message);
    }
};


// ✅ Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        return sendResponse(res, 200, true, 'Products fetched successfully', products);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error', err.message);
    }
};

// ✅ Update a product
// export const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;

//         const product = await Product.findById(id);
//         if (!product) return sendResponse(res, 404, false, 'Product not found');

//         if (req.files?.length > 0) {
//             product.images = req.files.map(file => `/uploads/${file.filename}`);
//         }

//         for (const [key, value] of Object.entries(updates)) {
//             if (key === 'stockCount') {
//                 product.stockCount = Number(value);
//                 product.inStock = product.stockCount > 0;
//             } else if (key === 'inStock') {
//                 product.inStock = value === 'true' || value === true;
//             } else if (key === 'fastDelivery') {
//                 product.fastDelivery = value === 'true' || value === true;
//             } else if (key === 'sizes') {
//                 // ✅ Overwrite sizes with cleaned ones
//                 const cleanSizes = Array.isArray(value)
//                     ? value.map(s => s.replace(/[^a-zA-Z0-9]/g, '')).filter(Boolean)
//                     : typeof value === 'string'
//                         ? value.replace(/[\[\]\\"]/g, '').split(',').map(s => s.trim()).filter(Boolean)
//                         : [];

//                 product.sizes = cleanSizes;
//             } else if (key === 'productInfo') {
//                 product.productInfo = typeof value === 'string' ? JSON.parse(value) : value;
//             } else {
//                 product[key] = value;
//             }
//         }

//         await product.save();
//         return sendResponse(res, 200, true, 'Product updated successfully', product);
//     } catch (err) {
//         console.error(err);
//         return sendResponse(res, 500, false, 'Server Error', err.message);
//     }
// };
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findById(id);
        if (!product) return sendResponse(res, 404, false, 'Product not found');

        // 1️⃣ Remove images if specified
        let imagesToRemove = [];
        if (updates.imagesToRemove) {
            imagesToRemove = Array.isArray(updates.imagesToRemove)
                ? updates.imagesToRemove
                : typeof updates.imagesToRemove === 'string'
                    ? JSON.parse(updates.imagesToRemove)
                    : [];
            product.images = product.images.filter(img => !imagesToRemove.includes(img));
        }

        if (updates.removeImages) {
            const removeImages = Array.isArray(updates.removeImages)
                ? updates.removeImages
                : typeof updates.removeImages === 'string'
                    ? JSON.parse(updates.removeImages)
                    : [];
            product.images = product.images.filter(img => !removeImages.includes(img));
        }

        // 2️⃣ Add newly uploaded images
        if (req.files?.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            product.images = [...product.images, ...newImages];
        }

        // 3️⃣ Update other fields
        for (const [key, value] of Object.entries(updates)) {
            if (['imagesToRemove', 'removeImages'].includes(key)) continue;

            if (key === 'stockCount') {
                product.stockCount = Number(value);
                product.inStock = product.stockCount > 0;
            } else if (key === 'inStock') {
                product.inStock = value === 'true' || value === true;
            } else if (key === 'fastDelivery') {
                product.fastDelivery = value === 'true' || value === true;
            } else if (key === 'sizes') {
                const cleanSizes = Array.isArray(value)
                    ? value.map(s => s.replace(/[^a-zA-Z0-9]/g, '')).filter(Boolean)
                    : typeof value === 'string'
                        ? value.replace(/[\[\]\\"]/g, '').split(',').map(s => s.trim()).filter(Boolean)
                        : [];
                product.sizes = cleanSizes;
            } else if (key === 'productInfo') {
                product.productInfo = typeof value === 'string' ? JSON.parse(value) : value;
            } else {
                product[key] = value;
            }
        }

        await product.save();
        return sendResponse(res, 200, true, 'Product updated successfully', product);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error', err.message);
    }
};


// ✅ Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) return sendResponse(res, 404, false, 'Product not found');
        return sendResponse(res, 200, true, 'Product deleted successfully', product);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error', err.message);
    }
};

// ✅ Search products
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return sendResponse(res, 400, false, 'Search query is required');

        const searchRegex = new RegExp(query, 'i');
        const products = await Product.find({
            $or: [
                { title: { $regex: searchRegex } },
                { description: { $regex: searchRegex } },
                { category: { $regex: searchRegex } },
                { tag: { $regex: searchRegex } },
                { amount: isNaN(query) ? undefined : Number(query) },
                { discountedAmount: isNaN(query) ? undefined : Number(query) }
            ]
        }).populate('category');

        return sendResponse(res, 200, true, 'Search results', products);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error', err.message);
    }
};

// ✅ Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate('category');
        return sendResponse(res, 200, true, 'Products by category fetched', products);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error', err.message);
    }
};

// ✅ Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category');

        if (!product) return sendResponse(res, 404, false, 'Product not found');

        return sendResponse(res, 200, true, 'Product fetched successfully', product);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error', err.message);
    }
};
