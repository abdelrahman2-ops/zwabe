import * as seoPageServices from "../services/seopage.service.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js";
import { APIFeatures } from "../utils/queryFeatures.js";

export const getAllSeoPages = async (req, res, next) => {
    let filter = {};

    const features = new APIFeatures(seoPageServices.getAll(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const docs = await features.query;

    // Transform the results to include sections with name property
    const transformedDocs = docs.map(page => {
        const transformedSections = [];

        if (page.sections) {
            const sectionsData = page.sections.toObject ? page.sections.toObject() : page.sections;

            if (sectionsData && typeof sectionsData === 'object') {
                let entries = [];

                if (sectionsData instanceof Map) {
                    entries = Array.from(sectionsData.entries());
                } else {
                    entries = Object.entries(sectionsData);
                }

                if (entries.length > 0) {
                    entries.forEach(([sectionName, sectionData]) => {
                        if (Array.isArray(sectionData)) {
                            transformedSections.push({
                                name: sectionName,
                                data: sectionData
                            });
                        } else {
                            const cleanSectionData = sectionData.toObject ? sectionData.toObject() : sectionData;
                            transformedSections.push({
                                name: sectionName,
                                ...cleanSectionData
                            });
                        }
                    });
                }
            }
        }

        const pageObj = page.toObject();
        pageObj.sections = transformedSections;

        return pageObj;
    });

    res.status(200).json({
        status: 'success',
        results: transformedDocs.length,
        data: {
            data: transformedDocs
        }
    });
};
export const addSeoPage = createOne("seopage");
export const getSeoPage = getOne("seopage");
export const updateSeoPage = updateOne("seopage");
export const deleteSeoPage = deleteOne("seopage");

export const getSeoPageBySlug = async (req, res, next) => {
    const { seopageSlug } = req.params;

    const page = await seoPageServices.getSEOPageBySlug(seopageSlug);

    if (!page) {
        return res.status(404).json({
            status: "fail",
            message: "SEO Page not found",
        });
    }

    const response = {
        _id: page._id,
        title: page.title,
        subtitle: page.subtitle,
        description: page.description,
        descText: page.descText,
        slug: page.slug,
        seo: page.seo,
        createdBy: page.createdBy,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
        sections: page.sections || {},
    };

    res.status(200).json({
        status: "success",
        data: response,
    });
};