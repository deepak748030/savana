import Category from '../models/category.model.js';
import { sendResponse } from '../utils/sendResponse.js';
import slugify from 'slugify';

export const createCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return sendResponse(res, 400, false, 'Title is required');

        const slug = slugify(title.toLowerCase());
        const image = req.file ? `/uploads/categories/${req.file.filename}` : '';

        const category = await Category.create({ title, slug, image });
        return sendResponse(res, 201, true, 'Category created', category);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return sendResponse(res, 200, true, 'Categories fetched', categories);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const category = await Category.findById(id);
        if (!category) return sendResponse(res, 404, false, 'Category not found');

        if (title) category.title = title;
        if (title) category.slug = slugify(title.toLowerCase());

        if (req.file) {
            category.image = `/uploads/categories/${req.file.filename}`;
        }

        await category.save();
        return sendResponse(res, 200, true, 'Category updated', category);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) return sendResponse(res, 404, false, 'Category not found');

        return sendResponse(res, 200, true, 'Category deleted', category);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 500, false, 'Server Error');
    }
};