import GlobalSettings from "../models/GlobalSettings.js";

export const getAll = (filter) => {
    return GlobalSettings.find(filter);
}

export const createOne = async (body) => {
    return GlobalSettings.create(body)
}
export const getOneById = async (id) => {
    return GlobalSettings.findById(id)
}

export const updateOne = async (id, body ) => {
    return await GlobalSettings.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await GlobalSettings.findByIdAndDelete(id)
}


export const getGlobalSettingsBySlug = async (slug) => {
    return await GlobalSettings.findOne({ slug })
}
