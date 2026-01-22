import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as countryControllers from '../controllers/country.controller.js'
import { checkModelId, checkModelSlug } from '../utils/checkDocumentExists.js';
import { countrySchema , countryUpdateSchema} from '../schema/countrySchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import upload from '../middlewares/upload.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { transformCountryData } from '../middlewares/countryTransform.js';
import { seoTransform } from '../middlewares/seoTransform.js';
const router = express.Router();






router.post("/bulk-upload", upload.single("file"), countryControllers.bulkInsertCountries);





router.get('/:countrySlug', checkModelSlug('country'), countryControllers.getCountryDetails)


router
    .route('/')
    .get(countryControllers.getAllCountries)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('country'), uploadImages, transformCountryData, validateRequest(countrySchema), countryControllers.addCountry)


router
    .route('/admin/:id')
    .get(checkModelId('country'), countryControllers.getCountry)
    .patch(checkModelId('country'), protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('country'), uploadImages, transformCountryData, seoTransform, validateRequest(countryUpdateSchema),  countryControllers.updateCountry)
    
    .delete(checkModelId('country'), protect, restrictTo(['admin']), countryControllers.deleteCountry)



export default router;