import z from 'zod'
import mongoose from 'mongoose';
const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});


export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل"),
});

/* ------------------ المستخدم ------------------ */
export const userValidationSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب").trim(),
  email: z.string().email("البريد الإلكتروني غير صالح").min(1, "البريد الإلكتروني مطلوب"),
  password: z.string().min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل"),
  role: z.enum(["user", "admin", "manager", "data-entry"]).default("user"),
});

/* ------------------ تحديث المستخدم ------------------ */
export const userUpdateValidationSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب").trim().optional(),
  email: z.email("البريد الإلكتروني غير صالح").optional(),
  password: z.string().min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل").optional(),
  role: z.enum(["user", "admin", "manager", "data-entry"]).optional(),
});

/* ------------------ تغيير كلمة المرور ------------------ */
export const changePasswordSchema = z.object({
  password: z.string().min(6, "كلمة المرور الحالية يجب أن تحتوي على 6 أحرف على الأقل"),
  newPassword: z.string().min(6, "كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل"),
  passwordConfirm: z.string().min(6, "يرجى تأكيد كلمة المرور الجديدة"),
}).refine((data) => data.newPassword === data.passwordConfirm, {
  message: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
  path: ["passwordConfirm"],
});