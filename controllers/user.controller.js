import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { AppError } from "../utils/appError.js"
import { allowedData, deActivateTheUser, updateData } from "../services/user.js"
export const getAllUsers = getAll('user')

export const addUser = createOne('user')

export const getUser = getOne('user')

export const updateUser = updateOne('user')

export const deleteUser = deleteOne('user')


export const updateMe = async (req, res, next) => {
    if (req.body.password) {
        return next(new AppError('use /auth/changePassword ', 400))
    }

    const allowedObj = allowedData(req.body, ['email', 'name'])
    const updatedUser = await updateData(req.user._id, allowedObj)

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
}


