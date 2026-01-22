// countrySchema.ts
import { z } from 'zod';

import mongoose from 'mongoose';
import { seoSchema } from './seoSchema.js';
const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const timeOptions = ["صباحًا", "ظهرًا", "مساءً", "ليلًا"];

export const monthOptions = [
  "يناير", 
  "فبراير", 
  "مارس", 
  "أبريل", 
  "مايو", 
  "يونيو",
  "يوليو", 
  "أغسطس", 
  "سبتمبر", 
  "أكتوبر", 
  "نوفمبر", 
  "ديسمبر"
];

export const countrySchema = z.object({
  name: z.string({
    required_error: "اسم الدولة مطلوب",
  })
    .trim()
    .min(1, { message: "اسم الدولة لا يمكن أن يكون فارغًا" }),

  code: z.string({
    required_error: "كود الدولة مطلوب",
  })
    .trim()
    .min(2, { message: "كود الدولة يجب أن يتكون من حرفين على الأقل" })
    .max(3, { message: "كود الدولة لا يمكن أن يزيد عن 3 أحرف" })
    .transform(val => val ? val.toUpperCase() : val)
    .optional(),

  continent: z.string({
    required_error: "القارة مطلوبة",
  }).min(1, { message: "اسم القارة لا يمكن أن يكون فارغًا" }),

  slug: z.string()
    .optional()
    .transform(val => val ? val.toLowerCase() : val),

  currency: z.string({
    required_error: "العملة مطلوبة",
  }).min(1, { message: "العملة لا يمكن أن تكون فارغة" }).optional(),


  favMonth: z.array(
    z.enum(monthOptions, {
      errorMap: () => ({ message: "الشهر المفضل يجب أن يكون أحد القيم المحددة" })
    })
  ).optional(),

  language: z.string({
    required_error: "اللغة مطلوبة",
  }).min(1, { message: "اللغة لا يمكن أن تكون فارغة" }),

  description: z.string({
    required_error: "الوصف مطلوب",
  }).min(1, { message: "الوصف لا يمكن أن يكون فارغًا" }),

  descText: z.string().optional(),

  isActive: z.boolean().default(true),

  imageCover: z.string().optional(),

  images: z.array(z.string()).optional(),

  alt: z.string().optional(),

  seo: seoSchema
});

export const countryUpdateSchema = countrySchema.partial()

