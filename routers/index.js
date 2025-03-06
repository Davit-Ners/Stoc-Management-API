import { Router } from "express";
import productRouter from "./product.router.js";

const mainRouter = Router();

mainRouter.use('/product', productRouter);

export default mainRouter;