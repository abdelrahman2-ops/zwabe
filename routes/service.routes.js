import express from 'express';
const router = express.Router();

import * as serviceControllers from '../controllers/service.controller.js'
import upload from '../middlewares/upload.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { checkModelId } from '../utils/checkDocumentExists.js';
import { serviceSchema, serviceUpdateSchema } from '../schema/serviceSchema.js';
import { seoTransform } from '../middlewares/seoTransform.js';
import { transformCityData } from '../middlewares/cityTransform.js';

router
    .route('/')
    .get(serviceControllers.getAllServices)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('service'), uploadImages, seoTransform, transformCityData, validateRequest(serviceSchema), serviceControllers.addService)



router
    .route('/admin/:id')
    .get(checkModelId('service'), serviceControllers.getService)
    .patch(checkModelId('service'), protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]), resizePhotos('service'), uploadImages, seoTransform, transformCityData, validateRequest(serviceUpdateSchema), serviceControllers.updateService)
    
    .delete(checkModelId('service'), protect, restrictTo(['admin']), serviceControllers.deleteService)

export default router

