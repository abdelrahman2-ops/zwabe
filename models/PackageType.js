import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';
import {AppError} from '../utils/appError.js';
import { uniqueSlugPlugin } from '../utils/slugifyHelper.js';


const packageTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  descText: {
    type: String,
    trim: true
  },
  imageCover: String,
  isActive: {
    type: Boolean,
    default: true
  },
  slug: { type: String, unique: true },
  alt: { type: String, trim: true },
  seo: { type: seoSchema, default: {} },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: true
});


packageTypeSchema.pre('updateOne', async function (next) {

  const update = this.getUpdate();
  const slug = update?.slug;

  if (!slug) return next();

  const exists = await this.constructor.findOne({
    slug,
    _id: { $ne: this.getQuery()._id },
  });

  if (exists) {
    return next(new AppError('Slug already exists, please choose another one'));
  }

  next();
})


packageTypeSchema.pre('save', async function (next) {

  if (this.slug) {
    const exists = await this.constructor.findOne({ slug: this.slug });

    if (exists) {
      return next(new AppError('Slug already exists, please choose another one'));
    }
  }
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }


  // Generate alt if not provided
  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});

export default mongoose.model('PackageType', packageTypeSchema);