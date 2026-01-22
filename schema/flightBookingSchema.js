import { z } from 'zod';
import { seoSchema } from './seoSchema.js';

export const flightBookingSchema = z.object({
    email: z.email("بريد إلكتروني غير صالح"),
    slug: z.string().optional(),

    phone: z
        .string(),
    fromCity: z.string().min(1, "مدينة المغادرة مطلوبة"),
    toCity: z.string().min(1, "مدينة الوصول مطلوبة"),
    departureDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "تاريخ المغادرة غير صالح",
    }),
    returnDate: z
        .string()
        .optional()
        .refine((date) => !date || !isNaN(Date.parse(date)), {
            message: "تاريخ العودة غير صالح",
        }),
    passengers: z.number().int().positive().min(1).max(10),
    alt: z.string().optional(),
    seo: seoSchema
});


