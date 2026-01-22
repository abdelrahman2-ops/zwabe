// hotelSchema.ts
import { z } from 'zod';

import mongoose from 'mongoose';
const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});
import { seoSchema } from './seoSchema.js';


export const hotelSchema = z.object({
  name: z.string({ required_error: "اسم الفندق مطلوب" }).trim().min(1, "اسم الفندق مطلوب"),

  country: objectIdString,
  city: objectIdString,

  rating: z.string().optional(),
  category: z.string().optional(),

  roomNumber: z.string( "عدد الغرف يجب أن يكون رقمًا موجبًا" ).optional(),
  roomType: z.string().optional(),

  description: z.string().min(1, "الوصف مطلوب"),
  descText: z.string().optional(),

  isActive: z.boolean().default(true),

  phone: z.string().trim().optional(),
  email: z.email("البريد الإلكتروني غير صالح").optional(),
  website: z.url("رابط الموقع غير صالح").optional(),
  address: z.string().trim().min(1, "العنوان مطلوب").optional(),
  slug: z.string().optional(),

  price: z.object({
    min: z.string().min(1, "السعر الأدنى مطلوب"),
    max: z.string().min(1, "السعر الأقصى مطلوب"),
  }),

  imageCover: z.string().optional(),
  images: z.array(z.string()).optional(),
  alt: z.string().optional(),
  seo: seoSchema
});




export const hotelUpdateSchema = hotelSchema.partial();
