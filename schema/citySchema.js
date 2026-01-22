// citySchema.ts
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

export const citySchema = z.object({
  name: z.string({
    required_error: "اسم المدينة مطلوب",
  }).min(1, { message: "اسم المدينة لا يمكن أن يكون فارغًا" }),

  country: objectIdString, 

  description: z.string({
    required_error: "الوصف مطلوب",
  }).min(1, { message: "الوصف لا يمكن أن يكون فارغًا" }),

  descText: z.string().optional(),

  slug: z.string()
    .optional()
    .transform(val => val ? val.toLowerCase() : val),

  coordinates: z.object({
    lat: z.string({
      required_error: "خط العرض مطلوب",
    }),
    lng: z.string({
      required_error: "خط الطول مطلوب",
    }),
  }).optional(),

  favTime: z.array(z.enum(timeOptions, {
    errorMap: () => ({ message: "الوقت المفضل يجب أن يكون أحد القيم المحددة" })
  })).optional(),

  favMonth: z.array(z.enum(monthOptions, {
    errorMap: () => ({ message: "الشهر المفضل يجب أن يكون أحد القيم المحددة" })
  })).optional(),

  imageCover: z.string().url().optional(),

  images: z.array(z.string().url()).optional(),
  
  alt: z.string().optional(),

  seo: seoSchema,

  relatedCities: z.array(objectIdString).optional(),
});



export const cityUpdateSchema = citySchema.partial()