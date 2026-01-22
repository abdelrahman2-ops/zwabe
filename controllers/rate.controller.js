import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import Rate from "../models/Rate.js"
import Package from "../models/Package.js"
import { AppError } from "../utils/appError.js"

export const addRate = createOne('rate')
export const getAllRates = getAll('rate')
export const getRate = getOne('rate')
export const updateRate = updateOne('rate')
export const deleteRate = deleteOne('rate')

export const getRatesByPackageSlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const pkg = await Package.findOne({ slug });
        if (!pkg) {
            return next(new AppError('No package found with that slug', 404));
        }
        const rates = await Rate.find({ package: pkg._id });
        res.status(200).json({
            status: 'success',
            data: {
                data: rates
            }
        });
    } catch (error) {
        next(error);
    }
}
