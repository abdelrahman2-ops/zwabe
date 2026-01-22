import { z } from 'zod';

import mongoose from 'mongoose';
import { seoSchema } from './seoSchema.js';

export const packageTypeSchema = z.object({
  name: z.string().trim().min(1, "اسم النوع مطلوب"),
  imageCover: z.string().optional(),
  description: z.string().optional(),
  descText: z.string().optional(),
  slug: z.string().optional(),
  isActive: z.boolean().default(true),
  alt: z.string().optional(),
  seo: seoSchema
});

export const packageTypeUpdateSchema = packageTypeSchema.partial()