import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';
import seoSchema from './Seo.js';

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageCover: { type: String },
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





airlineSchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }

  next();
});


export default mongoose.model('Airline', airlineSchema);
