import ContactMessage from "../models/ContactMessage.js";

export const getAll = (filter) => {
    return ContactMessage.find(filter);
}

export const createOne = async (body) => {
    return ContactMessage.create(body)
}

export const getOneById = async (id) => {
    return ContactMessage.findById(id)
}

export const updateOne = async (id, body) => {
    return await ContactMessage.findByIdAndUpdate(id, body, {
        new: true,
    })
}
export const deleteOne = async (id) => {
    return await ContactMessage.findByIdAndDelete(id)
}
