import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { errorResponse, successResponse } from "../utils/responseHandler.js"
import { getPackageTypeBySlug } from "../services/packageType.js"
import { getDistinctPackageTypeCountryIds, getPackageBySlug, getRelatedPackages } from "../services/package.js"
import { getCountriesInPackageType, getCountryBySlug } from "../services/country.js"
import { getAllCountryPackages } from "../services/package.js"
import { getPackagesInPackageType } from "../services/package.js"

export const getAllPackageTypes = getAll('packageType')

export const addPackageType = createOne('packageType')

export const getPackageType = getOne('packageType')

export const updatePackageType = updateOne('packageType')

export const deletePackageType = deleteOne('packageType')



export const getPackageTypeCountries = async (req, res, next) => {
    const { packageTypeSlug } = req.params
    const packageType = await getPackageTypeBySlug(packageTypeSlug)
    if (!packageType) {
        return errorResponse(res, 404, 'Not packageType found with this slug')
    }
    const countryIds = await getDistinctPackageTypeCountryIds(packageType._id)
    console.log(countryIds)
    const countries = await getCountriesInPackageType(countryIds)
    return successResponse(res, 200, 'all countires in this packageType', countries)
}



export const getPackageTypePackages = async (req, res, next) => {
    const { packageTypeSlug } = req.params
    const packageType = await getPackageTypeBySlug(packageTypeSlug)
    if (!packageType) {
        return errorResponse(res, 404, 'Not packageType found with this slug')
    }

    const packages = await getPackagesInPackageType(packageType._id)
    return successResponse(res, 200, 'all packages in this packageType', {packages, packageType})
}


export const getCountryPackages = async (req, res, next) => {
    const { countrySlug } = req.params
    const { packageTypeSlug } = req.params
    const country = await getCountryBySlug(countrySlug)
    if (!country) {
        return errorResponse(res, 404, 'Not country found with this slug')
    }

    const packageType = await getPackageTypeBySlug(packageTypeSlug)
    if (!packageType) {
        return errorResponse(res, 404, 'Not packageType found with this slug')
    }

    const packages = await getAllCountryPackages(country._id, packageType._id)
    return successResponse(res, 200, 'all packages in this country', packages)

}


export const getPackageDetails = async (req, res, next) => {
    const { packageSlug } = req.params
    // const pkg = await getPackageInfo(packageSlug)
    const { pkg, branches } = await getPackageBySlug(packageSlug)

    if (!pkg) {
        return errorResponse(res, 404, 'Not package found with this slug')
    }

    // get random packages
    const relatedPackages = await getRelatedPackages(pkg.packageType._id, pkg._id)

    return successResponse(res, 200, 'get package details', { pkg, branches, relatedPackages })
}