import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { AppError } from "../utils/appError.js"
import Branch from "../models/Branch.js"

export const addBranch = async (req, res, next) => {
  try {
    const { packageId } = req.params
    if (!packageId) {
      return next(new AppError('No packageId found', 400))
    }
    const branch = await Branch.create({ ...req.body, package: packageId })
    res.status(201).json({
      status: 'success',
      data: {
        data: branch
      }
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


export const addDayToBranch = async (req, res) => {

  const { id } = req.params

  const branch = await Branch.findById(id)

  const newDay = req.body;

  const dayExists = branch.days.some(
    day => day.dayNumber === newDay.dayNumber
  );

  if (dayExists) {
    return res.status(400).json({
      message: `Day number ${newDay.dayNumber} already exists in this branch`
    });
  }
  if (!branch) {
    return res.status(404).json({
      message: 'Branch not found'
    })
  }


  if (!newDay.dayNumber || !newDay.type) {
    return res.status(400).json({
      message: 'dayNumber and type are required'
    });
  }

  if (newDay.type === 'CUSTOM') {
    if (!newDay.customTitle || !newDay.customDescription) {
      return res.status(400).json({
        message: 'customTitle and customDescription are required for CUSTOM day'
      });
    }
  }

  if (newDay.type === 'TOUR') {
    if (!newDay.tour) {
      return res.status(400).json({
        message: 'tour is required for TOUR day'
      });
    }
  }

  branch.days.push(newDay);

  branch.daysCount = branch.days.length;
  branch.nightsCount = Math.max(branch.daysCount - 1, 0);

  await branch.save();

  res.status(201).json({
    message: 'Day added successfully',
    branch
  });
};

export const getBranch = getOne('branch')

export const updateBranch = updateOne('branch')

export const deleteBranch = deleteOne('branch')

