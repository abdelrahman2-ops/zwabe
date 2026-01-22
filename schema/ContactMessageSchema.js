import { z } from "zod";
import { seoSchema } from "./seoSchema.js";

export const contactMessageSchema = z.object({
  name: z.string({
    required_error: "الاسم مطلوب",
  })
    .trim()
    .min(1, { message: "يجب إدخال الاسم" }),

  email: z.string({
    required_error: "البريد الإلكتروني مطلوب",
  })
    .email("البريد الإلكتروني غير صالح"),

  phone: z.string({
    required_error: "رقم الهاتف مطلوب",
  })
    .trim()
    .min(5, { message: "رقم الهاتف غير صحيح" }),

  message: z.string({
    required_error: "الرسالة مطلوبة",
  })
    .trim()
    .min(5, { message: "يجب أن تحتوي الرسالة على 5 أحرف على الأقل" }),

  slug: z.string()
    .optional()
    .transform(val => val ? val.toLowerCase() : val),

  alt: z.string().trim().optional(),

  seo: seoSchema
});
