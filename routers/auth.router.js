import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { bodyValidatorMiddelware } from "../middelwares/bodyValidation.middelware.js";
import { UserSchema } from "../validators/user.validator.js";
import { passwordValidatorMiddelware } from "../middelwares/passwordValidation.middelware.js";
import { authBodyCheckMiddelware } from "../middelwares/authBodyCheck.middelware.js";

const authRouter = Router();

authRouter.route('/login')
    .post(authController.login);

authRouter.route('/register')
    .post(bodyValidatorMiddelware(UserSchema), authController.register);

authRouter.route('/setPassword/:id')
    .get(await authBodyCheckMiddelware(), authController.setPasswordGET)
    .post(await authBodyCheckMiddelware(), await passwordValidatorMiddelware(), authController.setPasswordPOST);

export default authRouter;