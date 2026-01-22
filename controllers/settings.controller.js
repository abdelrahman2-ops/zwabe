import { log } from "console"
import GlobalSettings from "../models/GlobalSettings.js"
import { flatten } from "../utils/flatten.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"


export const addSettings = createOne('settings')

export const getSettings = getOne('settings')


export const getGlobalSettings = async (req, res) => {
    const settings = await GlobalSettings.findOne()

    res.status(200).json({
        status: 'success',
        data: settings
    })
}



export const updateSettings = async (req, res, next) => {
    console.log(1, req.body);
    const updates = flatten(req.body)
    console.log(2, updates);
    const updated = await GlobalSettings.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true }
    );
    res.status(200).json({
        status: 'success',
        data: updated
    })

}
export const deleteSettings = deleteOne('settings')