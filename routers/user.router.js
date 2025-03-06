import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/')
    .get(userController.getAll);

userRouter.route('/:id')
    .get(userController.getById);

export default userRouter;