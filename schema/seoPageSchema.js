import { z } from "zod";
import { seoSchema } from './seoSchema.js';

// ---------- Flexible Section Schema ----------
const baseSectionSchema = z.any(); // Allow any data type for maximum flexibility

// ---------- SeoPage Schema ----------
export const seoPageSchema = z.object({
    hero: z.string().trim().optional(),
    footer: z.string().trim().optional(),
    title: z.string().trim().min(1, "Page title is required"),
    subtitle: z.string().trim().optional(),
    description: z.string().trim().optional(),
    descText: z.string().trim().optional(),

    // Dynamic sections - Map structure to match model
    sections: z.record(z.string(), baseSectionSchema).optional(),

    slug: z.string().trim().optional(), // Auto-generated from title if not provided

    seo: seoSchema.optional(),
});

export const seoPageUpdateSchema = seoPageSchema.partial();

// Export individual schemas for reuse
export { seoSchema, baseSectionSchema };