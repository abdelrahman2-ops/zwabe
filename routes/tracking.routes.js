import express from 'express';
import { upsertTrackingId, getAllTrackingIds } from '../controllers/tracking.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/', upload.any(), protect, restrictTo(['admin']), upsertTrackingId);   
router.get('/', getAllTrackingIds);   

export default router;
