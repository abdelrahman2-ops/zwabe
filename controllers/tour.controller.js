import { getTourBySlug } from "../services/tour.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { errorResponse, successResponse } from "../utils/responseHandler.js"

export const getAllTours = getAll('tour')

export const addTour = createOne('tour')

export const getTour = getOne('tour')

export const updateTour = updateOne('tour')

export const deleteTour = deleteOne('tour')





export const getTourDetails = async (req, res, next) => {
    const { tourSlug } = req.params
    const tour = await getTourBySlug(tourSlug)
    if(!tour){
        return errorResponse(res, 404, 'Not Tour found with this slug')
    }
    return successResponse(res, 200, 'all tour details', tour)
}