import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});

export const rateSchema = z.object({
    authorName: z.string().min(1, "Author name is required"),
    content: z.string().min(1, "Content is required"),
    rate: z.number().min(1).max(5),
    package: objectIdString
});

export const rateUpdateSchema = rateSchema.partial();
