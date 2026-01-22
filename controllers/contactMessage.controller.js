import { createOne, deleteOne, getAll, getOne } from "../utils/handlerFactory.js"

export const getAllMessages = getAll('message')

export const addMessage = createOne('message')

export const getMessage = getOne('message')


export const deleteMessage = deleteOne('message')