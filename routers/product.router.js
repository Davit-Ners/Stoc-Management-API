import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route('/')
    .get(productController.getAll);

productRouter.route('/:id')
    .get(productController.getById);

export default productRouter;