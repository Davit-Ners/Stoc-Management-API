import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route('/')
    .get(productController.getAll)
    .post(productController.add);

productRouter.route('/:id')
    .get(productController.getById);

export default productRouter;