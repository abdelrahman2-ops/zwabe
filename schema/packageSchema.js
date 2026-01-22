import { z } from 'zod';
import mongoose from 'mongoose';
import { seoSchema } from './seoSchema.js';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

// --- 🧳 packageSchema ---
export const packageSchema = z.object({
  name: z.string().min(1, "اسم الباقة مطلوب"),

  description: z.string().min(1, "الوصف مطلوب"),
  descText: z.string().optional(),
  slug: z.string().optional(),

  country: objectIdString,
  cities: z.union([z.array(objectIdString, { required_error: "يجب اختيار المدن" }), objectIdString]),
  packageType: objectIdString,

  imageCover: z.string().optional(),
  images: z.array(z.string()).optional(),
  alt: z.string().optional(),
  seo: seoSchema
});


export const packageUpdateSchema = packageSchema.partial()