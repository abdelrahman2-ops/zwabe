import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"

export const getAllOffers = getAll('offer')

export const addOffer = createOne('offer')

export const getOffer = getOne('offer')

export const updateOffer = updateOne('offer')

export const deleteOffer = deleteOne('offer')

