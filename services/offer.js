import Offer from "../models/Offer.js"

export const getAll = (filter) => {
    return Offer.find(filter);
}

export const createOne = async (body) => {
    return Offer.create(body)
}
export const getOneById = async (id ) => {
    return Offer.findById(id)
}

export const updateOne = async (id, body ) => {
    return await Offer.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id ) => {
    return await Offer.findByIdAndDelete(id)
}
