import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';

const headerSchema = new mongoose.Schema({
  dayNumber: { type: String, required: true, min: 1 },
  nights: { type: String, required: true, min: 0 },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  }
});

const itinerarySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    min: 1
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
});

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  packageType: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageType', required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true }],
  imageCover: String,
  images: [String],
  description: { type: String, required: true },
  descText: {
    type: String,
    trim: true
  },
  ratingsAverage: { type: Number, default: 4 },
  ratingsQuantity: { type: Number, default: 0 },
  slug: { type: String, unique: true },
  alt: { type: String, trim: true },
  seo: { type: seoSchema, default: {} },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


packageSchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});

packageSchema.virtual('rates', {
    ref: 'Rate',
    foreignField: 'package',
    localField: '_id'
})

export default mongoose.model('Package', packageSchema);