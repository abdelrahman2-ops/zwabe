import express from "express";
const router = express.Router();
import * as userController from '../controllers/user.controller.js'
import { protect, restrictTo } from "../middlewares/auth.js";
import { checkModelId } from "../utils/checkDocumentExists.js";
import { userUpdateValidationSchema, userValidationSchema } from "../schema/userSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import multer from "multer";
import { uniqueUser } from "../middlewares/uniqueUser.js";
import { restrictPasswordUpdate } from "../middlewares/noPasswordUpdate.js";
import { transformCityData } from "../middlewares/cityTransform.js";

const upload = multer()

router.use(protect)

router.patch('/update-me', transformCityData, validateRequest(userUpdateValidationSchema), userController.updateMe)



router.use(restrictTo(['admin']))
router
  .route('/')
    .get(userController.getAllUsers)  
    .post(upload.none(), transformCityData, validateRequest(userValidationSchema), uniqueUser, userController.addUser)


router
    .route('/admin/:id')
    .get(checkModelId('user'), userController.getUser)
    .patch(upload.none(), checkModelId('user'), transformCityData, validateRequest(userUpdateValidationSchema), uniqueUser, restrictPasswordUpdate,  userController.updateUser)
    .delete(checkModelId('user'), userController.deleteUser)    


export default router;    