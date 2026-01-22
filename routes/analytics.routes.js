import express from "express";
import { analytics, getFacebookAnalytics, getSnapchatAnalytics, getTiktokAnalytics, getTwitterAnalytics } from "../controllers/analytics.controller.js";
const router = express.Router()


router.get('/', analytics)
router.post('/facebook', getFacebookAnalytics)
router.post('/twitter', getTwitterAnalytics)
router.post('/snapchat', getSnapchatAnalytics)
router.post('/tiktok', getTiktokAnalytics)


export default router