import Branch from '../models/Branch.js';

export const checkBranchBelongsToPackage = async (req, res, next) => {
  const { packageId, id } = req.params;

  const branch = await Branch.findOne({
    _id: id,
    package: packageId
  });

  if (!branch) {
    return res.status(404).json({
      message: 'Branch does not belong to this package or not found'
    });
  }

  req.branch = branch;

  next();
};
