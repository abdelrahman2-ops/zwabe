import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllBookings = getAll('flightBooking')

export const addBooking = createOne('flightBooking')

export const getBooking = getOne('flightBooking')

export const updateBooking = updateOne('flightBooking')

export const deleteBooking = deleteOne('flightBooking')



