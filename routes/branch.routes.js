import express from 'express';
import { branchSchema, branchUpdateSchema, daySchema } from '../schema/branchSchema.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import * as branchControllers from '../controllers/branch.controller.js'
import { protect, restrictTo } from '../middlewares/auth.js';
import { checkBranchBelongsToPackage } from '../middlewares/checkBranch.js';
const router = express.Router({ mergeParams: true });



router.post('/', protect, restrictTo(['admin', 'manager', 'data-entry']), validateRequest(branchSchema), branchControllers.addBranch)
router.patch('/:id', protect, restrictTo(['admin', 'manager']), checkBranchBelongsToPackage, validateRequest(branchUpdateSchema), branchControllers.updateBranch)
router.delete('/:id', protect, restrictTo(['admin', 'manager']), checkBranchBelongsToPackage, branchControllers.deleteBranch)

router.post(
  '/:id/days',
  protect,
  restrictTo(['admin', 'manager', 'data-entry']),
  checkBranchBelongsToPackage,
  validateRequest(daySchema),
  branchControllers.addDayToBranch
);


export default router