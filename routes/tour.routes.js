import express from 'express';
const router = express.Router();

import * as tourControllers from '../controllers/tour.controller.js'
import upload from '../middlewares/upload.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { checkModelId, checkModelSlug } from '../utils/checkDocumentExists.js';
import { tourSchema, tourUpdateSchema } from '../schema/tourSchema.js';
import { transformTourData } from '../middlewares/tourTransform.js';
import { seoTransform } from '../middlewares/seoTransform.js';
import { transformCityData } from '../middlewares/cityTransform.js';







router.get('/:tourSlug', checkModelSlug('tour'), tourControllers.getTourDetails)



router
    .route('/')
    .get(tourControllers.getAllTours)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('tour'), uploadImages, transformCityData, validateRequest(tourSchema), tourControllers.addTour)



router
    .route('/admin/:id')
    .get(checkModelId('tour'), tourControllers.getTour)
    .patch(checkModelId('tour'), protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('tour'), uploadImages, transformCityData, seoTransform, validateRequest(tourUpdateSchema),  tourControllers.updateTour)
    
    .delete(checkModelId('tour'), protect, restrictTo(['admin']), tourControllers.deleteTour)

export default router

