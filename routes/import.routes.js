import express from 'express';
import upload from '../middlewares/upload.js';
import { importExcelController } from '../controllers/importExcel.controller.js';

const router = express.Router();

router.post('/:model', upload.single('file'), importExcelController);

export default router;
