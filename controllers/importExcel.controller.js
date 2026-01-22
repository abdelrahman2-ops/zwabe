import { importExcel } from '../services/importExcel.service.js';

export const importExcelController = async (req, res, next) => {
  try {
    const { model } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const results = await importExcel({ model, buffer: req.file.buffer });
    res.status(201).json({ success: true, message: 'Import successful', count: results.length, data: results });
  } catch (error) {
    next(error);
  }
};
