import { z } from 'zod';
import mongoose from 'mongoose';
const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});
import { seoSchema } from './seoSchema.js';

export const serviceSchema = z.object({
  name: z.string().min(1, "اسم الخدمة مطلوب").trim(),
  imageCover: z.string().optional(),
  description: z.string().optional(),
  descText: z.string().optional(),
  method: z.string().optional(),
  summary: z.string().optional(),
  slug: z.string().trim().optional(),
  alt: z.string().optional(),
  seo: seoSchema
});

export const serviceUpdateSchema = serviceSchema.partial()