import { z } from "zod";
import mongoose from 'mongoose';
import { seoSchema } from "./seoSchema.js";
const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
}); 
export const blogSchema = z.object({
  title: z.string({
    required_error: "العنوان مطلوب",
  })
    .trim()
    .nonempty("يجب إدخال عنوان المقال"),

  descText: z.string({
    required_error: "النص المختصر مطلوب",
  })
    .trim()
    .nonempty("يجب إدخال النص المختصر"),

  description: z.string({
    required_error: "الوصف الكامل مطلوب",
  })
    .trim()
    .nonempty("يجب إدخال الوصف الكامل"),

  slug: z.string()
    .optional()
    .transform(val => val ? val.toLowerCase() : val),

  tags: z.array(z.string().trim()).optional(),

  imageCover: z.string().optional(),

  images: z.array(z.string()).optional(),

  alt: z.string().optional(),

  seo: seoSchema
});
export const blogUpdateSchema = blogSchema.partial();
