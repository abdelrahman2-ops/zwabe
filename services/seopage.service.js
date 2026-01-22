import SeoPage from '../models/SeoPage.js';

// Helper function to transform sections
const transformSections = (page) => {
    let transformedSections = [];
    if (page.sections) {
        const sectionsData = page.sections.toObject ? page.sections.toObject() : page.sections;
        if (sectionsData && typeof sectionsData === 'object' && Object.keys(sectionsData).length > 0) {
            let entries = [];
            if (sectionsData instanceof Map) {
                entries = Array.from(sectionsData.entries());
            } else {
                entries = Object.entries(sectionsData);
            }
            if (entries.length > 0) {
                transformedSections = entries.map(([sectionName, sectionData]) => {
                    if (Array.isArray(sectionData)) {
                        return {
                            name: sectionName,
                            data: sectionData
                        };
                    } else {
                        const cleanSectionData = sectionData.toObject ? sectionData.toObject() : sectionData;
                        return {
                            name: sectionName,
                            ...cleanSectionData
                        };
                    }
                });
            }
        }
    }
    // Always return sections as an array
    const pageObj = page.toObject();
    pageObj.sections = transformedSections;
    return pageObj;
};

export const getAll = (filter) => {
    return SeoPage.find(filter);
};

export const getAllWithTransform = async (filter) => {
    const pages = await SeoPage.find(filter);

    // Transform each page to include sections with name property
    return pages.map(page => transformSections(page));
};

export const createOne = async (body) => {
    // Transform sections array to object if needed
    let newBody = { ...body };
    if (Array.isArray(body.sections)) {
        const sectionsObj = {};
        body.sections.forEach(section => {
            if (section.name) {
                const { name, data, ...otherSectionData } = section;
                sectionsObj[name] = data || otherSectionData;
            }
        });
        newBody.sections = sectionsObj;
    }
    return SeoPage.create(newBody);
};

export const getOneById = async (id) => {
    const page = await SeoPage.findById(id);

    if (!page) {
        return null;
    }

    return transformSections(page);
};

export const updateOne = async (id, body) => {
    console.log('Updating SEO Page with ID:', body);
    const updateObj = { $set: {} };

    // Handle top-level fields
    for (const key in body) {
        if (key !== 'sections') {
            updateObj.$set[key] = body[key];
        }
    }

    if (body.sections) {
        if (Array.isArray(body.sections)) {
            const sectionsObj = {};
            body.sections.forEach(section => {
                if (section.name) {
                    // If section.data is an array, store as array, else as object
                    if (Array.isArray(section.data)) {
                        sectionsObj[section.name] = section.data;
                    } else {
                        const { name, data, ...otherSectionData } = section;
                        sectionsObj[name] = data || otherSectionData;
                    }
                }
            });
            updateObj.$set.sections = sectionsObj;
        } else if (typeof body.sections === 'object') {
            // If already an object, use as is
            updateObj.$set.sections = body.sections;
        }
    }

    const updatedPage = await SeoPage.findByIdAndUpdate(
        id,
        updateObj,
        { new: true, runValidators: true }
    );

    // Return null if not found
    if (!updatedPage) {
        return null;
    }

    return transformSections(updatedPage);
};


export const deleteOne = async (id) => {
    return await SeoPage.findByIdAndDelete(id);
};

export const getSEOPageBySlug = async (slug) => {
    return await SeoPage.findOne({ slug }).lean();
};


const flattenObject = (obj, parentKey = "", res = {}) => {
    for (let key in obj) {
        // Skip if value is a function
        if (typeof obj[key] === 'function') {
            continue;
        }

        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            if (obj[key].constructor && obj[key].constructor.name === 'ObjectId') {
                res[newKey] = obj[key];
            } else {
                flattenObject(obj[key], newKey, res);
            }
        } else {
            res[newKey] = obj[key];
        }
    }
    return res;
};