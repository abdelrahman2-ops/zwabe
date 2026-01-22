import Booking from "../models/Booking.js";


export const getAll = (filter) => {
    return Booking.find(filter);
}

export const createOne = async (body) => {
    return Booking.create(body)
}

export const getOneById = async (id) => {
    return Booking.findById(id)
}

export const updateOne = async (id, body) => {
    return await Booking.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id) => {
    return await Booking.findByIdAndDelete(id)
}
