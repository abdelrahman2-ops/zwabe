import { z } from "zod";
import mongoose from 'mongoose';


const objectIdString = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val));

import { seoSchema } from './seoSchema.js';

export const pathSchema = z.array(z.object({
  title: z.string().trim().nonempty("المسار مطلوب"),
  duration: z.string().trim(),
  description: z.string().trim().nonempty("وصف المسار مطلوب"),
  descText: z.string().trim(),
}));


const headerSchema = z.object({
  days: z.string(),
  people: z.string(),
  type: z.string()
})

export const tourSchema = z.object({
  title: z.string().trim().nonempty("اسم الجولة مطلوب"),
  description: z.string().trim().nonempty("الوصف مطلوب"),
  descText: z.string().trim().optional(),
  slug: z.string().trim().optional(),

  city: z.preprocess(
    (val) => (val === undefined ? "" : val), 
    objectIdString.refine((val) => !!val, { message: "المدينة مطلوبة" })
  ),
  country: z.preprocess(
    (val) => (val === undefined ? "" : val),
    objectIdString.refine((val) => !!val, { message: "الدولة مطلوبة" })
  ),
  // header: headerSchema.optional(),

  // includes: z.union([z.string(), z.array(z.string())])
  //   .refine(val => val && (Array.isArray(val) ? val.length > 0 : val.trim() !== ""), {
  //     message: "يجب إدخال ما يشمله البرنامج",
  //   }),

  // excludes: z.union([z.string(), z.array(z.string())])
  //   .refine(val => val && (Array.isArray(val) ? val.length > 0 : val.trim() !== ""), {
  //     message: "يجب إدخال ما لا يشمله البرنامج",
  //   }),

  paths: pathSchema,
  imageCover: z.string().optional(),
  images: z.array(z.string()).optional(),
  alt: z.string().optional(),
  seo: seoSchema,
});
export const tourUpdateSchema = tourSchema.partial()