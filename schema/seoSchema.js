import { z } from "zod";


export const seoSchema = z.object({
  metaTitle: z.string().trim().max(60, "العنوان لا يجب أن يتجاوز 60 حرفًا").optional(),
  metaDescription: z.string().trim().max(160, "الوصف لا يجب أن يتجاوز 160 حرفًا").optional(),
  keywords: z.string().trim().optional(),
  slugUrl: z.string().trim().optional(),
  priority: z.string().optional(),
  changeFrequency: z.enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).default('monthly'), noIndex: z.enum(['true', 'false']).default('false'),
  noFollow: z.enum(['true', 'false']).default('false'),
  noArchive: z.enum(['true', 'false']).default('false'),
  noSnippet: z.enum(['true', 'false']).default('false'),
  ogTitle: z.string().trim().max(260).optional(),
  ogDescription: z.string().trim().max(160).optional(), 
  ogImage: z.string().trim().optional(),
}).optional()