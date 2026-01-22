import { z } from 'zod';
import mongoose from 'mongoose';
import { seoSchema } from './seoSchema.js';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const airlineSchema = z.object({
  name: z.string({
    required_error: "اسم شركة الطيران مطلوب",
  }).min(1, { message: "اسم شركة الطيران لا يمكن أن يكون فارغًا" }),

  imageCover: z.string().optional(),

  slug: z.string()
    .optional()
    .transform(val => val ? val.toLowerCase() : val),

  alt: z.string().optional(),

  seo: seoSchema
});

export const airlineUpdateSchema = airlineSchema.partial();
