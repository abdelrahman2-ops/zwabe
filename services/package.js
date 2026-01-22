import Package from "../models/Package.js";
import { AppError } from "../utils/appError.js";
import Branch from "../models/Branch.js";


export const getAll = (filter) => {
    return Package.find(filter).populate('packageType', 'slug _id name').populate('country', 'slug _id name').select('name descText imageCover seo slug description cities country images imageCover')
}

export const createOne = async (body) => {
    return Package.create(body)
}
export const getOneById = async (id) => {
    return Package.findById(id)
}

export const updateOne = async (id, body) => {
    return await Package.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id) => {
    return await Package.findByIdAndDelete(id)
}

export const getDistinctPackageTypeCountryIds = async (packageTypeId) => {
    return await Package.distinct('country', { packageType: packageTypeId })
}


export const getAllCountryPackages = async (countryId, packageTypeId) => {
    return await Package.find({ country: countryId, packageType: packageTypeId }).populate('country', 'name').select(' descText slug imageCover name price seo alt rate header country ')
}



export const getCityPackages = async (cityId) => {
    return await Package.find({ city: cityId }).populate('country', 'name').select('name descText imageCover price rate')
}









export const getPackagesInPackageType = async (id) => {
    const packages = await Package.find({ packageType: id }).populate('country', 'name').populate('cities', 'name').select('name descText imageCover seo slug description cities country').lean()
    return packages
}

export const getRelatedPackages = async (packageTypeId, excludePackageId) => {
    const count = await Package.countDocuments({ packageType: packageTypeId, _id: { $ne: excludePackageId } });
    const random = Math.floor(Math.random() * (count - 3));
    const related = await Package.find({ packageType: packageTypeId, _id: { $ne: excludePackageId } })
        .skip(random)
        .limit(3)
        .select('name slug imageCover descText ratingsAverage ratingsQuantity');

    if (related.length > 0) {
        return related;
    }
}


export const getPackageBySlug = async (slug) => {
    const pkg = await Package.findOne({ slug }).populate('country', 'name').populate('cities', 'name').populate('packageType', 'name').select('name seo descText imageCover images slug description ratingsQuantity ratingsAverage packageType')
    if (!pkg) {
        throw new AppError('No Document found with that ID', 404);
    }
    const branches = await Branch.find({ package: pkg._id }).populate('days.tour')
    return { pkg, branches }
}
export const getPackageById = async (id) => {
    const pkg = await Package.findById(id).populate('country', 'name').populate('cities', 'name').populate('packageType', 'name').select('name seo descText imageCover images slug description ratingsQuantity ratingsAverage packageType')
    if (!pkg) {
        throw new AppError('No Document found with that ID', 404);
    }
    const branches = await Branch.find({ package: pkg._id }).populate('days.tour')
    return { pkg, branches }
}



// export const getPackageInfo = async (packageSlug) => {
//   return await Package.findOne({ slug: packageSlug })
//     .populate({
//       path: 'cities',
//       select: 'imageCover slug name descText'
//     })
//     .populate({
//       path: 'header.location',
//       select: 'name'
//     })
//     .populate('packageType', 'name')
//     .select('imageCover images name seo description itinerary packageType header rate descText price includes excludes cities');
// };
//     package: objectIdString,
//     name: z.string().min(1),
//     daysCount: z.number(),
//     nightsCount: z.number(),
//     price: z.number(),
//     includes: z.array(z.string()).optional(),
//     excludes: z.array(z.string()).optional(),
//     days: z.array(daySchema),
//     slug: z.string().optional(),
//     alt: z.string().optional(),
//     seo: seoSchema
// });
