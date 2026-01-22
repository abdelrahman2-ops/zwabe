import express from 'express';
const router = express.Router();
import * as settingControllers from '../controllers/settings.controller.js'
import { protect, restrictTo } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
import { checkModelId } from '../utils/checkDocumentExists.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { globalSettingsSchema, globalSettingsUpdateSchema } from '../schema/globalSettingsSchema.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import { transformSettingsdata } from '../middlewares/settingsTransform.js';



router
.route('/')
    .get(settingControllers.getGlobalSettings)
    .post(protect, restrictTo(['admin']), upload.any(), resizePhotos('settings'), uploadImages, transformSettingsdata, validateRequest(globalSettingsSchema),  settingControllers.addSettings)


router
.route('/admin/:id')
    .patch(checkModelId('settings'), protect, restrictTo(['admin', 'manager']), upload.any(), resizePhotos('settings'), uploadImages, transformSettingsdata,  validateRequest(globalSettingsUpdateSchema), settingControllers.updateSettings)

    .delete(checkModelId('settings'), protect, restrictTo(['admin']), settingControllers.deleteSettings)




export default router