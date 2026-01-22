// middlewares/upload.js
import multer from 'multer';
import { AppError } from '../utils/appError.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file) return cb(null, true);
  const isImage = file.mimetype.startsWith('image/');
  const isExcel = file.mimetype.match(/(sheet|excel|spreadsheetml)/);
  const isCSV = file.mimetype === 'text/csv';
  if (!isImage && !isExcel && !isCSV) {
    return cb(new AppError('Only images, Excel, or CSV files are allowed!', 400), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB default
  }
});

export default upload;