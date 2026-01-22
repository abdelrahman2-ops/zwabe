import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';
import { monthOptions, timeOptions } from '../schema/countrySchema.js';

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    uppercase: true,
    maxlength: 3
  },
  continent: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
  },
  language: {
    type: String,
  },
  description: {
    type: String,
  },
  descText: {
    type: String,
    trim: true
  },
  favMonth: {
    type: [String],
    enum: monthOptions,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  images: [String],
  imageCover: {
    type: String,
  },
  slug: { type: String, unique: true },
  alt: { type: String, trim: true },
  seo: { type: seoSchema, default: {} },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


countrySchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  // Generate alt if not provided
  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});

export default mongoose.model('Country', countrySchema);