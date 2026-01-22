import { createOne, deleteOne, getOne, updateOne } from "../utils/handlerFactory.js"
import { getAll } from "../services/service.js";
import GlobalSettings from "../models/GlobalSettings.js";



export const getAllServices = async (req, res, next) => {
  const services = await getAll()
  const settings = await GlobalSettings.findOne().select('contactInfo.phones').lean();
  res.status(200).json({
    status: 'success',
    data: {
      data: 
        services, settings
    }
  });
}


export const addService = createOne('service')

export const getService = getOne('service')

export const updateService = updateOne('service')

export const deleteService = deleteOne('service')