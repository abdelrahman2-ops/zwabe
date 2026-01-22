import Rate from "../models/Rate.js";
import { AppError } from "../utils/appError.js";

export const createOne = async (body) => {
    return Rate.create(body)
}

export const getAll = async (filter = {}) => {
    return Rate.find(filter).populate('package', 'name slug')
}

export const getOneById = async (id) => {
    const rate = await Rate.findById(id).populate('package', 'name slug')
    if (!rate) {
        throw new AppError('No Document found with that ID', 404);
    }
    return rate
}

export const updateOne = async (id, body) => {
    const rate = await Rate.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })
    if (!rate) {
        throw new AppError('No Document found with that ID', 404);
    }
    return rate
}

export const deleteOne = async (id) => {
    const rate = await Rate.findByIdAndDelete(id)
    if (!rate) {
        throw new AppError('No Document found with that ID', 404);
    }
    return rate
}
