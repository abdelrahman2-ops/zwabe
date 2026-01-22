import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
    rating: {
      type: String,
    },
    category: {
      type: String,
    },
    roomNumber: {
      type: Number,
    },
    roomType: {
      type: String,
    },
    description: {
      type: String,
    },
    descText: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    price: {
      min: {
        type: String,
        required: true,
      },
      max: {
        type: String,
        required: true,
      },
    },
    imageCover: {
      type: String,
    },
    images: [String],
    slug: { type: String, unique: true },
    alt: { type: String, trim: true },
    seo: { type: seoSchema, default: {} },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);



hotelSchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  // Generate alt if not provided
  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});

export default mongoose.model('Hotel', hotelSchema);
