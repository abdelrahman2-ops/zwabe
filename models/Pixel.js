import mongoose from 'mongoose';
import { _enum } from 'zod/v4/core';

const pixelSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true, 
    enum: ['meta', 'tiktok', 'linkedin', 'snapchat', 'google']
  },
  pixelId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Pixel', pixelSchema);
