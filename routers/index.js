import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import stockRouter from "./stock.router.js";

const mainRouter = Router();

mainRouter.use('/product', productRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/stock', stockRouter);

export default mainRouter;