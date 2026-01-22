import { z } from "zod";

const phoneSchema = z.object({
  number: z.string({
    required_error: "رقم الهاتف مطلوب",
  }).trim().min(5, { message: "رقم الهاتف غير صالح" }),

  label: z.string().default("رئيسي"),

  isPrimary: z.boolean().default(false),

  isWhatsApp: z.boolean().default(false),

  countryCode: z.string().default("+966")
});

// --- مخطط البريد الإلكتروني ---
const emailSchema = z.object({
  email: z.string({
    required_error: "البريد الإلكتروني مطلوب",
  })
    .trim()
    .email({ message: "البريد الإلكتروني غير صالح" }),

  label: z.string().default("عام"),

  isPrimary: z.boolean().default(false),

  department: z.enum(["general", "support", "sales", "booking", "complaints"], {
    errorMap: () => ({ message: "القسم يجب أن يكون أحد القيم المحددة" })
  }).default("general"),
});

// --- مخطط مواقع التواصل الاجتماعي (لكل منصة) ---
const socialMediaEntrySchema = z.object({
  name: z.string().optional(),
  url: z
    .url({ message: "رابط غير صالح" })
    .optional(),
  deskTopImage: z.string().optional(),
  mobileImage: z.string().optional(),
});

// --- مواقع التواصل الاجتماعي ---
const socialMediaSchema = z.object({
  facebook: socialMediaEntrySchema.optional(),
  instagram: socialMediaEntrySchema.optional(),
  youtube: socialMediaEntrySchema.optional(),
  twitter: socialMediaEntrySchema.optional(),
  tiktok: socialMediaEntrySchema.optional(),
  snapchat: socialMediaEntrySchema.optional(),
  linkedin: socialMediaEntrySchema.optional(),
  whatsApp: socialMediaEntrySchema.optional(),
});

// --- السكيما الأساسية (Global Settings) ---
export const globalSettingsSchema = z.object({
  contactInfo: z.object({
    phones: z.array(phoneSchema, {
      errorMap: () => ({ message: "قائمة أرقام الهواتف غير صالحة" }),
    }).optional(),

    emails: z.array(emailSchema, {
      errorMap: () => ({ message: "قائمة البريد الإلكتروني غير صالحة" }),
    }).optional(),

    addresses: z.array(
      z.string({
        required_error: "العنوان مطلوب",
      }).min(5, { message: "العنوان قصير جدًا" })
    ).nonempty({ message: "يجب إضافة عنوان واحد على الأقل" }),
  }),

  socialMedia: socialMediaSchema.optional(),
});


export const globalSettingsUpdateSchema = globalSettingsSchema.partial()