import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { bodyValidatorMiddelware } from "../middelwares/bodyValidation.middelware.js";
import { ProductSchema } from "../validators/product.validator.js";
import { updateValidationMiddelware } from "../middelwares/updateValidation.middelware.js";
import multer from "multer";

const productRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

productRouter.route('/')
    .get(productController.getAll)
    .post(bodyValidatorMiddelware(ProductSchema), productController.add);

productRouter.route('/:id')
    .get(productController.getById)
    .patch(await updateValidationMiddelware(ProductSchema), productController.update);

    productRouter.route('/upload/:id')
    .post(upload.single('image'), productController.addImage);

export default productRouter;