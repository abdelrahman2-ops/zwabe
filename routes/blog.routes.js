import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as blogControllers from '../controllers/blog.controller.js'
import { checkModelId, checkModelSlug } from '../utils/checkDocumentExists.js';
import { blogSchema , blogUpdateSchema} from '../schema/blogSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { resizePhotos } from '../middlewares/resizePhotos.js';
import { uploadImages } from '../middlewares/uploadPhotos.js';
import upload from '../middlewares/upload.js';
import { seoTransform } from '../middlewares/seoTransform.js';
import { transformCityData } from '../middlewares/cityTransform.js';
const router = express.Router();

router.get('/:blogSlug', checkModelSlug('blog'), blogControllers.getBlogDetails)



router
    .route('/')
    .get(blogControllers.getAllBlogs)
    .post(protect, restrictTo(['admin', 'manager', 'data-entry']), upload.fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 20 }
    ]), resizePhotos('blog'), uploadImages, seoTransform, transformCityData, validateRequest(blogSchema), blogControllers.addBlog)


router
    .route('/admin/:id')
    .get(checkModelId('blog'), blogControllers.getBlog)
    .patch(checkModelId('blog'), protect, restrictTo(['admin', 'manager']), upload.fields([
        {name: 'imageCover', maxCount: 1},
        {name: 'images', maxCount: 20}
    ]),resizePhotos('blog'), uploadImages, seoTransform, transformCityData, validateRequest(blogUpdateSchema),  blogControllers.updateBlog)
    
    .delete(checkModelId('blog'), protect, restrictTo(['admin']), blogControllers.deleteBlog)

export default router











