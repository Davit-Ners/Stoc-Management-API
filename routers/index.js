import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";

const mainRouter = Router();

mainRouter.use('/product', productRouter);
mainRouter.use('/user', userRouter);

export default mainRouter;