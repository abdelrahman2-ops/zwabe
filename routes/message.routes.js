import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as messageControllers from '../controllers/contactMessage.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { contactMessageSchema } from '../schema/ContactMessageSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();


router
    .route('/')
    .get(protect, restrictTo(['admin', 'manager']), messageControllers.getAllMessages)
    .post(validateRequest(contactMessageSchema), messageControllers.addMessage)



router
    .route('/admin/:id')
    .get(checkModelId('message'), protect, restrictTo(['admin', 'manager']), messageControllers.getMessage)

    .delete(checkModelId('message'), protect, restrictTo(['admin']), messageControllers.deleteMessage)

export default router











