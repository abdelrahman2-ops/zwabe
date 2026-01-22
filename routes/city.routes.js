import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as cityControllers from '../controllers/city.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { citySchema, cityUpdateSchema } from '../schema/citySchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { checkModelSlug } from '../utils/checkDocumentExists.js';
import upload from '../middlewares/upload.js';
import { transformCountryData } from '../middlewares/countryTransform.js';
import { seoTransform } from '../middlewares/seoTransform.js';
import { transformCityData } from '../middlewares/cityTransform.js';
const router = express.Router();

router.get('/:citySlug', checkModelSlug('city'), cityControllers.getCityDetails)



router.post("/bulk-upload", upload.single("file"), cityControllers.bulkInsertCities);




router
    .route('/')
    .get(cityControllers.getAllCities)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('city'), uploadImages, transformCityData, validateRequest(citySchema), cityControllers.addCity)



router
    .route('/admin/:id')
    .get(checkModelId('city'), cityControllers.getCity)
    .patch(checkModelId('city'), protect, restrictTo(['admin', 'manager']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('city'), uploadImages, transformCityData, seoTransform, validateRequest(cityUpdateSchema), cityControllers.updateCity)

    .delete(checkModelId('city'), protect, restrictTo(['admin']), cityControllers.deleteCity)




export default router;