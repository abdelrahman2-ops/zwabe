import express from "express";
import { protect, restrictTo } from "../middlewares/auth.js";
import * as seoPageControllers from "../controllers/seoPage.controller.js";
import { checkModelId, checkModelSlug } from "../utils/checkDocumentExists.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { seoPageSchema, seoPageUpdateSchema } from "../schema/seoPageSchema.js";
import upload from "../middlewares/upload.js";
import { transformSingleSeoPageSections, sectionsArrayToObject, transformSeoPageSectionsForFrontend } from "../middlewares/seoPageTransform.js";

const router = express.Router();

router
    .route("/:seopageSlug")
    .get(checkModelSlug("seopage"),
        transformSeoPageSectionsForFrontend,
        seoPageControllers.getSeoPageBySlug
    );

router
    .route("/")
    .get(protect, restrictTo(["admin", "manager"]), seoPageControllers.getAllSeoPages)
    .post(
        protect,
        restrictTo(["admin", "manager", "data-entry"]),
        upload.any(),
        sectionsArrayToObject,
        validateRequest(seoPageSchema),
        transformSingleSeoPageSections,
        seoPageControllers.addSeoPage
    );

router
    .route("/admin/:id")
    .get(checkModelId("seopage"),
        protect,
        restrictTo(["admin", "manager"]),
        transformSingleSeoPageSections, seoPageControllers.getSeoPage)
    .patch(
        protect,
        restrictTo(["admin", "manager"]),
        upload.any(),
        sectionsArrayToObject,
        validateRequest(seoPageUpdateSchema),
        transformSingleSeoPageSections,
        seoPageControllers.updateSeoPage
    )
    .delete(checkModelId("seopage"), protect, restrictTo(["admin"]), seoPageControllers.deleteSeoPage);

export default router;