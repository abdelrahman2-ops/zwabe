import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as offerControllers from '../controllers/offer.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import upload from '../middlewares/upload.js';
import { offerSchema, offerUpdateSchema } from '../schema/offerSchema.js';
import { seoTransform } from '../middlewares/seoTransform.js';
import { transformCityData } from '../middlewares/cityTransform.js';
const router = express.Router();







router
    .route('/')
    .get(offerControllers.getAllOffers)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('offer'), uploadImages, transformCityData, validateRequest(offerSchema), offerControllers.addOffer)



router
    .route('/admin/:id')
    .get(checkModelId('offer'), offerControllers.getOffer)
    .patch(checkModelId('offer'), protect, restrictTo(['admin', 'manager']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('offer'), uploadImages, seoTransform, transformCityData, validateRequest(offerUpdateSchema), offerControllers.updateOffer)

    .delete(checkModelId('offer'), protect, restrictTo(['admin']), offerControllers.deleteOffer)

export default router;