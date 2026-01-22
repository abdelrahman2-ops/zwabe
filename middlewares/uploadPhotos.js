import fs from 'fs'
import { cloudinaryUploadImage } from '../utils/cloudinary.js'




async function assignUploadedFile(obj, fieldname, file) {
  const path = fieldname.replace(/\[(\w+)\]/g, ".$1");
  const parts = path.split(".");

  const result = await cloudinaryUploadImage(file.path);
  await fs.promises.unlink(file.path);

  let current = obj;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i === parts.length - 1) {
      current[part] = result.secure_url;
    } else {
      if (!current[part] || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part];
    }
  }
}


export const uploadImages = async (req, res, next) => {
  if (!req.files)
    return next()

  if (req.files.imageCover && Array.isArray(req.files.imageCover)) {

    const result = await cloudinaryUploadImage(req.files.imageCover[0].path)
    await fs.promises.unlink(req.files.imageCover[0].path)

    req.body.imageCover = result.secure_url
  }
  if (req.files.images && Array.isArray(req.files.images)) {
    req.body.images = []
    await Promise.all(
      req.files.images.map(async file => {
        const result = await cloudinaryUploadImage(file.path)
        await fs.promises.unlink(file.path)

        req.body.images.push(result.secure_url)
      })
    )
  }

  if (Array.isArray(req.files)) {
    for (const file of req.files) {
      const key = file.fieldname;
      if (key.startsWith("socialMedia[") && key.endsWith("Image]")) {
        await assignUploadedFile(req.body, key, file);
      }
    }

  }

  next()
}