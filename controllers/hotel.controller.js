import { getHotelBySlug } from "../services/hotel.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { errorResponse, successResponse } from "../utils/responseHandler.js"
import * as searchHotels from '../utils/searchHotels.js'
import { getFutureDate } from '../utils/futureDate.js'
import { GLOBAL_FEATURED_HOTELS } from '../config/global.js'

export const getAllHotels = async (req, res, next) => {
    try {
        const { cityId, checkIn, checkOut, adults, children } = req.query;
        let searchCriteria = {
            checkIn: checkIn || getFutureDate(7),
            checkOut: checkOut || getFutureDate(10),
            adults: Number(adults) || 2,
            children: Number(children) || 0
        };

        // لو اليوزر مسرشش بمدينة معينة، اعرض له القائمة العالمية
        if (!cityId) {
            searchCriteria.hotelIds = GLOBAL_FEATURED_HOTELS; 
        } else {
            searchCriteria.cityId = Number(cityId);
        }

        const hotels = await searchHotels.getHotelPrices(searchCriteria)

        return successResponse(res, 200, 'Hotels fetched successfully', hotels);
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, 'Error fetching hotels', error);
    }
}

export const addHotel = createOne('hotel')

export const getHotel = async (req, res, next) => {
    const { id } = req.params;
    const { checkIn, checkOut, adults, children } = req.query;
    try {
        const hotelData = await searchHotels.getHotelPrices({
            hotelIds: [id], // بنبعت ID الفندق اللي ضغطنا عليه بس
            checkIn,
            checkOut,
            adults,
            children
        });
        res.json(hotelData[0]); // بنرجع أول فندق في النتيجة
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotel details" });
    }
}

export const updateHotel = updateOne('hotel')

export const deleteHotel = deleteOne('hotel')




export const getHotelDetails = async (req, res, next) => {
    const { hotelSlug } = req.params
    const hotel = await getHotelBySlug(hotelSlug)
    if (!hotel) {
        return errorResponse(res, 404, 'Not hotel found with this slug')
    }

    return successResponse(res, 200, 'all hotel details', hotel)
}