import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as hotelControllers from '../controllers/hotel.controller.js'
import { checkModelId, checkModelSlug } from '../utils/checkDocumentExists.js';
import { hotelSchema, hotelUpdateSchema } from '../schema/hotelSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import upload from '../middlewares/upload.js';
import { seoTransform } from '../middlewares/seoTransform.js';
import { transformHotelData } from '../middlewares/hotelTransform.js';
const router = express.Router();



router.get('/:hotelSlug', checkModelSlug('hotel'), hotelControllers.getHotelDetails)




router
    .route('/')
    .get(hotelControllers.getAllHotels)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('hotel'), uploadImages, seoTransform, transformHotelData, validateRequest(hotelSchema), hotelControllers.addHotel)



router
    .route('/admin/:id')
    .get(checkModelId('hotel'), hotelControllers.getHotel)
    .patch(checkModelId('hotel'), protect, restrictTo(['admin', 'manager']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('hotel'), uploadImages, seoTransform, transformHotelData, validateRequest(hotelUpdateSchema), hotelControllers.updateHotel)

    .delete(checkModelId('hotel'), protect, restrictTo(['admin']), hotelControllers.deleteHotel)

export default router;