import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { bodyValidatorMiddelware } from "../middelwares/bodyValidation.middelware.js";
import { ProductSchema } from "../validators/product.validator.js";
import { updateValidationMiddelware } from "../middelwares/updateValidation.middelware.js";

const productRouter = Router();

productRouter.route('/')
    .get(productController.getAll)
    .post(bodyValidatorMiddelware(ProductSchema), productController.add);

productRouter.route('/:id')
    .get(productController.getById)
    .patch(await updateValidationMiddelware(ProductSchema), productController.update);

export default productRouter;