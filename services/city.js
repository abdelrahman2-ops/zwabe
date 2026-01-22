import City from "../models/City.js";

export const getAll = (filter) => {
    return City.find(filter).populate('country', 'name').select('name description descText favTime favMonth imageCover images slug alt seo country relatedCities');
}

export const createOne = async (body) => {
    const city = await City.create(body);
    const updatedCity = await assignRelatedCities(city._id, 4);
    return updatedCity;
}
export const getOneById = async (id ) => {
    return City.findById(id).populate('country', 'name').select('name description descText favTime favMonth imageCover images slug alt seo country relatedCities');
}

export const updateOne = async (id, body ) => {
    return await City.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await City.findByIdAndDelete(id)
}



export const getCityBySlug = async (slug) => {
    return await City.findOne({ slug })
        .populate('country', 'name')
        .populate('relatedCities', 'name imageCover descText')
        .select('name description descText favTime favMonth imageCover images slug alt seo country relatedCities');
}

export const assignRelatedCities = async (cityId, count = 4) => {
    const otherCities = await City.find({ _id: { $ne: cityId } }).select('_id');
    if (otherCities.length === 0) return null;
    const shuffled = otherCities.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count).map(city => city._id);
    return await City.findByIdAndUpdate(cityId, { relatedCities: selected }, { new: true });
};
