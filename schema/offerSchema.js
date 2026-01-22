import { z } from "zod";
import { seoSchema } from './seoSchema.js';

export const offerSchema = z.object({
  imageCover: z.string().optional(),

  offer: z.string({ required_error: "العرض مطلوب" }),
  name: z.string().min(1, "الاسم مطلوب"),
  description: z.string().min(1, "الوصف مطلوب"),
  slug: z.string().optional(),

  price: z.string().min(1, "السعر مطلوب"),
  oldPrice: z.string().min(1, "السعر السابق مطلوب"),

  alt: z.string().optional(),
  seo: seoSchema
});

export const offerUpdateSchema = offerSchema.partial()