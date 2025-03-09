import { Router } from "express";
import stockController from "../controllers/stock.controller.js";
import { stockId_quantityMiddelware } from "../middelwares/stockId_quantityMiddelware.js";

const stockRouter = Router();

stockRouter.route('/add/:productId')
    .post(stockId_quantityMiddelware(false), stockController.add);

stockRouter.route('/remove/:productId')
    .post(stockId_quantityMiddelware(false), stockController.remove);

stockRouter.route('/')
    .get(stockController.getAll);

stockRouter.route('/cancel/:id')
    .post(stockController.cancel);

stockRouter.route('/updateStock/:productId')
    .patch(stockId_quantityMiddelware(true), stockController.updateStock);

export default stockRouter;