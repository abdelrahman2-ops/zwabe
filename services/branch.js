import Branch from "../models/Branch.js";
import { AppError } from "../utils/appError.js";

export const createOne = async (body) => {
    return Branch.create(body)
}
export const getOneById = async (id ) => {
    const branch = Branch.findById(id)
    if (!branch) {
        throw new AppError('No Document found with that ID', 404);
    }
    return branch
}

export const updateOne = async (id, body ) => {
    const branch = await Branch.findByIdAndUpdate(id, body, {
        new: true,  
    })
    if (!branch) {
        throw new AppError('No Document found with that ID', 404);
    }
    return branch
}
export const deleteOne = async (id ) => {
    const branch = await Branch.findByIdAndDelete(id)
    if (!branch) {
        throw new AppError('No Document found with that ID', 404);
    }
    return branch
}
