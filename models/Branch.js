import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';

const DaySchema = new mongoose.Schema(
  {
    dayNumber: { type: Number, required: true },

    type: {
      type: String,
      enum: ['CUSTOM', 'TOUR'],
      required: true
    },

    customTitle: { type: String },
    customDescription: { type: String },

    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour'
    }
  },
  { _id: false } 
);

const BranchSchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true
    },

    name: { type: String, required: true },

    daysCount: { type: Number, required: true },
    nightsCount: { type: Number, required: true },

    price: { type: Number, required: true },

    includes: [{ type: String }],
    excludes: [{ type: String }],

    days: [DaySchema],
    slug: { type: String, unique: true },
    alt: { type: String, trim: true },
    seo: { type: seoSchema, default: {} },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model('Branch', BranchSchema);