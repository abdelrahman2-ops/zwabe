import mongoose from "mongoose";
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';



const pathSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  duration: { type: String, trim: true },
  description: { type: String, trim: true },
  descText: { type: String, trim: true },
});

// const headerSchema = new mongoose.Schema({
//   days: { type: String, trim: true },
//   people: { type: String, trim: true },
//   type: { type: String, trim: true }
// })


const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    descText: { type: String, trim: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
    // includes: [{ type: String, trim: true }],
    // excludes: [{ type: String, trim: true }],
    // header: headerSchema,
    paths: [pathSchema],
    imageCover: String,
    images: [String],
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




tourSchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  // Generate alt if not provided
  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});


export default mongoose.model("Tour", tourSchema);