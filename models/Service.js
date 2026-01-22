import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        trim: true,
    },
    imageCover: { type: String },
    description: {
        type: String,
        trim: true
    },
    descText: {
        type: String,
        trim: true
    },
    method: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true
    },
    slug: { type: String, unique: true },
    alt: { type: String, trim: true },
    seo: { type: seoSchema, default: {} }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


serviceSchema.pre('save', async function (next) {
    if (!this.slug && this.name) {
        this.slug = await generateSlug(this.name, this.constructor);
    }

    // Generate alt if not provided
    if (!this.alt && this.name) {
        this.alt = `${this.name} - Package`;
    }

    next();
});


export default mongoose.model('Service', serviceSchema);