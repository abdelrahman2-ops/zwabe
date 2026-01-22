import { z } from 'zod';
import mongoose from 'mongoose';
import { seoSchema } from './seoSchema.js';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});

export const daySchema = z.object({
    dayNumber: z.number(),
    type: z.enum(['CUSTOM', 'TOUR']),
    customTitle: z.string().optional(),
    customDescription: z.string().optional(),
    tour: objectIdString.optional()
});

export const branchSchema = z.object({
    name: z.string().min(1),
    daysCount: z.number(),
    nightsCount: z.number(),
    price: z.number(),
    includes: z.array(z.string()).optional(),
    excludes: z.array(z.string()).optional(),
    days: z.array(daySchema),
    slug: z.string().optional(),
    alt: z.string().optional(),
    seo: seoSchema
});

export const branchUpdateSchema = branchSchema.partial();
