import express from 'express';
const router = express.Router({ mergeParams: true });

import * as packageControllers from '../controllers/package.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { packageSchema, packageUpdateSchema } from '../schema/packageSchema.js';
import upload from '../middlewares/upload.js';
import { transformPackageData } from '../middlewares/packageTransform.js';
import { seoTransform } from '../middlewares/seoTransform.js';
import brancheRoutes from './branch.routes.js'
import { transformCityData } from '../middlewares/cityTransform.js';




router
    .route('/')
    .get(packageControllers.getAllPackages)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), transformCityData, seoTransform, validateRequest(packageSchema), packageControllers.addPackage)




router
    .route('/admin/:id')
    .get(checkModelId('package'), packageControllers.getPackage)
    .patch(checkModelId('package'), protect, restrictTo(['admin', 'manager']), transformCityData, seoTransform, validateRequest(packageUpdateSchema), packageControllers.updatePackage)

    .delete(protect, restrictTo(['admin']), packageControllers.deletePackage)


router.post('/:packageId/images', protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 20 }
]), resizePhotos('package'), uploadImages, packageControllers.savePackageImages)

router.use('/:packageId/branches', brancheRoutes)










export default router;





