import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import Package from "../models/Package.js"
import { getPackageById } from "../services/package.js"
import { errorResponse, successResponse } from "../utils/responseHandler.js"

export const getAllPackages = getAll('package')

export const addPackage = createOne('package')

export const getPackage = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return errorResponse(res, 400, 'Package ID is required')
  }

    const { pkg, branches } = await getPackageById(id)
  

  if (!pkg) {
    return errorResponse(res, 404, 'Package not found')
  }
  return successResponse(res, 200, 'Package found', { pkg, branches })
};

export const updatePackage = updateOne('package')

export const deletePackage = deleteOne('package')

export const savePackageImages = async (req, res) => {
  const { packageId } = req.params;

  const pkg = await Package.findById(packageId);
  if (!pkg) {
    return res.status(404).json({ message: 'Package not found' });
  }

  if (req.body.imageCover) {
    pkg.imageCover = req.body.imageCover;
  }

  if (req.body.images) {
    pkg.images = [...(pkg.images || []), ...req.body.images];
  }

  await pkg.save();

  res.status(200).json({
    message: 'Images uploaded successfully',
    imageCover: pkg.imageCover,
    images: pkg.images
  });
};



