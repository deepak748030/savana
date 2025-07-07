import Comment from '../models/comment.model.js';
import { sendResponse } from '../utils/sendResponse.js';

// ✅ Create a new comment
export const createComment = async (req, res) => {
    try {
        const { productId, userId, commentMsg } = req.body;
        const file = req.file;

        if (!productId || !userId || !commentMsg) {
            return sendResponse(res, 400, false, 'productId, userId, and commentMsg are required');
        }

        const image = file ? `/uploads/${file.filename}` : null;

        const comment = await Comment.create({
            productId,
            userId,
            commentMsg,
            image,
        });

        return sendResponse(res, 201, true, 'Comment created successfully', comment);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error creating comment', err.message);
    }
};

// ✅ Get all comments by productId
export const getCommentsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const comments = await Comment.find({ productId }).sort({ createdAt: -1 });

        return sendResponse(res, 200, true, 'Comments fetched successfully', comments);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error fetching comments', err.message);
    }
};

// ✅ Update comment by ID
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentMsg } = req.body;
        const file = req.file;

        const comment = await Comment.findById(id);
        if (!comment) return sendResponse(res, 404, false, 'Comment not found');

        if (commentMsg) comment.commentMsg = commentMsg;
        if (file) comment.image = `/uploads/${file.filename}`;

        await comment.save();

        return sendResponse(res, 200, true, 'Comment updated successfully', comment);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error updating comment', err.message);
    }
};

// ✅ Delete comment by ID
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) return sendResponse(res, 404, false, 'Comment not found');

        return sendResponse(res, 200, true, 'Comment deleted successfully', comment);
    } catch (err) {
        return sendResponse(res, 500, false, 'Error deleting comment', err.message);
    }
};
