import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import authController from "../controllers/auth.controller.js";

const mainRouter = Router();

mainRouter.use('/product', productRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authController);

export default mainRouter;