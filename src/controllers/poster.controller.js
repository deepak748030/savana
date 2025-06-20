import Poster from '../models/poster.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// ✅ Create a new poster
export const createPoster = async (req, res) => {
    try {
        const { name, type } = req.body;
        const files = req.files || [];

        if (!name || !type) {
            return sendResponse(res, 400, false, 'Name and type are required');
        }

        const images = files.map(file => `/uploads/${file.filename}`);

        if (images.length === 0) {
            return sendResponse(res, 400, false, 'At least one image is required');
        }

        const existingPoster = await Poster.findOne({ name });

        if (existingPoster) {
            // ✅ Update existing
            if (type) existingPoster.type = type;
            existingPoster.images = [...existingPoster.images, ...images];
            await existingPoster.save();

            return sendResponse(res, 200, true, 'Poster already exists, updated successfully', existingPoster);
        }

        // ✅ Create new
        const poster = await Poster.create({ name, type, images });

        return sendResponse(res, 201, true, 'Poster created successfully', poster);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error creating or updating poster', err.message);
    }
};

// ✅ Get posters by name (partial match)
export const getPostersByName = async (req, res) => {
    try {
        const { name } = req.params;

        const posters = await Poster.find({
            name: { $regex: name, $options: 'i' }
        });

        return sendResponse(res, 200, true, 'Posters fetched successfully', posters);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error fetching posters', err.message);
    }
};

// ✅ Update a poster by ID
export const updatePoster = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body;
        const files = req.files || [];

        const poster = await Poster.findById(id);
        if (!poster) return sendResponse(res, 404, false, 'Poster not found');

        if (name) poster.name = name;
        if (type) poster.type = type;
        if (files.length > 0) {
            poster.images = files.map(file => `/uploads/${file.filename}`);
        }

        await poster.save();
        return sendResponse(res, 200, true, 'Poster updated successfully', poster);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error updating poster', err.message);
    }
};

// ✅ Delete poster by ID
export const deletePoster = async (req, res) => {
    try {
        const { id } = req.params;

        const poster = await Poster.findByIdAndDelete(id);
        if (!poster) return sendResponse(res, 404, false, 'Poster not found');

        return sendResponse(res, 200, true, 'Poster deleted successfully', poster);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error deleting poster', err.message);
    }
};
