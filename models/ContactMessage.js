import mongoose from "mongoose";
import { generateSlug } from "../utils/slugifyHelper.js";
import seoSchema from './Seo.js';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      minlength: 5,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    alt: { type: String, trim: true },

    seo: { type: seoSchema, default: {} },

  },
  { timestamps: true }
);




contactMessageSchema.pre("save", async function (next) {
  if (!this.slug && this.email) {
    this.slug = await generateSlug(this.email, this.constructor);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Contact Message`;
  }

  next();
});

export default mongoose.model("ContactMessage", contactMessageSchema);
