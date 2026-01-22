import express from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import packageRoutes from './package.routes.js';
import packageTypeRoutes from './packageTypes.routes.js';
import countryRoutes from './country.routes.js';
import cityRoutes from './city.routes.js';
import hotelRoutes from './hotel.routes.js';
import tourRoutes from './tour.routes.js';
import airLineRoutes from './airLine.routes.js';
import serviceRoutes from './service.routes.js';
import blogRoutes from './blog.routes.js';
import flightRoutes from './flightBooking.routes.js'
import offerRoutes from './offer.routes.js'
import seoPageRoutes from './seoPage.routes.js';
import messageRoutes from './message.routes.js';
import settingRoutes from './settings.routes.js';
import analyticsRoutes from './analytics.routes.js';
import trackingRoutes from './tracking.routes.js';
import { handleCreatedUpdatedBy } from '../middlewares/createdAndUpdated.js';
import importRoutes from './import.routes.js';
import rateRoutes from './rate.routes.js';
import { protect } from '../middlewares/auth.js';
// import branchRoutes from './branch.routes.js';
import * as branchControllers from '../controllers/branch.controller.js'
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Hello from API');
});

// middleware
router.use(handleCreatedUpdatedBy);

// routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/packages', packageRoutes);
// router.use('/branches', branchRoutes);
router.use('/packageTypes', packageTypeRoutes);
router.use('/countries', countryRoutes);
router.use('/cities', cityRoutes);
router.use('/rates', rateRoutes);
router.use('/hotels', hotelRoutes);
router.use('/flightBookings', flightRoutes);
router.use('/airLines', airLineRoutes);
router.use('/tours', tourRoutes);
router.use('/services', serviceRoutes);
router.use('/blogs', blogRoutes);
router.use('/offers', offerRoutes)
router.use('/seo-pages', seoPageRoutes);
router.use('/contact', messageRoutes);
router.use('/settings', settingRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/tracking', trackingRoutes);
router.use('/import', importRoutes);
router.get('/branches/:id', protect, branchControllers.getBranch)

export default router;
