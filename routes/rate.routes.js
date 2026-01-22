import express from 'express';
import * as rateController from '../controllers/rate.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { rateSchema, rateUpdateSchema } from '../schema/rateSchema.js';

const router = express.Router();

// Public routes
router.get('/package/:slug', rateController.getRatesByPackageSlug);

// Protected routes

router.route('/')
    .get(protect, restrictTo(['admin', 'manager']), rateController.getAllRates)
    .post(validateRequest(rateSchema), rateController.addRate);

router.route('/:id')
    .get(protect, restrictTo(['admin', 'manager']), rateController.getRate)
    .patch(protect, restrictTo(['admin', 'manager']), validateRequest(rateUpdateSchema), rateController.updateRate)
    .delete(protect, restrictTo(['admin', 'manager']), rateController.deleteRate);

export default router;
