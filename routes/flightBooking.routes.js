import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import * as flightBookingControllers from '../controllers/flightBooking.controller.js'
import { checkModelId } from '../utils/checkDocumentExists.js';
import { flightBookingSchema } from '../schema/flightBookingSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
const router = express.Router();


router
    .route('/')
    .get(protect, restrictTo(['admin', 'manager']), flightBookingControllers.getAllBookings)
    .post(validateRequest(flightBookingSchema), flightBookingControllers.addBooking)



router
    .route('/admin/:id')
    .get(checkModelId('flightBooking'), protect, restrictTo(['admin', 'manager'], flightBookingControllers.getBooking))

    .delete(checkModelId('flightBooking'), protect, restrictTo(['admin']), flightBookingControllers.deleteBooking)

export default router











