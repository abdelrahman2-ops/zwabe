import fs from 'fs';
import { cloudinaryUploadRawFile } from '../utils/cloudinary.js';

export const uploadExcelFile = async (req, res, next) => {
  if (!req.files || !req.files.excel || !Array.isArray(req.files.excel)) {
    return next();
  }
  const result = await cloudinaryUploadRawFile(req.files.excel[0].path);
  await fs.promises.unlink(req.files.excel[0].path);
  req.body.excelUrl = result.secure_url;
  next();
};
