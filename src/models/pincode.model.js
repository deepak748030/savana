import mongoose from 'mongoose';

const pincodeSchema = new mongoose.Schema({
    pincode: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Pincode', pincodeSchema);
