import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { bodyValidatorMiddelware } from "../middelwares/bodyValidation.middelware.js";
import { UserSchema } from "../validators/user.validator.js";

const authRouter = Router();

authRouter.route('/login')
    .post(authController.login);

authRouter.route('/register')
    .post(bodyValidatorMiddelware(UserSchema), authController.register);

export default authRouter;