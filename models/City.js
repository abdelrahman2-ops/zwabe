import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';
import { monthOptions, timeOptions } from '../schema/countrySchema.js';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  descText: {
    type: String,
    trim: true
  },
  coordinates: {
    lat: { type: String },
    lng: { type: String }
  },
  favMonth: {
    type: [String],
    enum: monthOptions,
    default: undefined,
  },
  imageCover: String,
  images: [String],
  slug: { type: String, unique: true },
  alt: { type: String, trim: true },
  seo: { type: seoSchema, default: {} },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  relatedCities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }]
},
  {
    timestamps: true,
  }
);


citySchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  // Generate alt if not provided
  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});

export default mongoose.model('City', citySchema);