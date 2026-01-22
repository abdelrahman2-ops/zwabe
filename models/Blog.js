import mongoose from "mongoose";
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    descText: { type: String, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    imageCover: { type: String },
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

blogSchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});


export default mongoose.model("Blog", blogSchema);
