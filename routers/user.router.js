import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { updateUserValidationMiddelware } from "../middelwares/userUpdateValidation.middelware.js";
import { UserSchema } from "../validators/user.validator.js";

const userRouter = Router();

userRouter.route('/')
    .get(userController.getAll);

userRouter.route('/:id')
    .get(userController.getById)
    .patch(await updateUserValidationMiddelware(UserSchema), userController.update);

userRouter.route('/:id/disable')
    .patch(userController.disable);

export default userRouter;