import { Router } from "express";
import stockController from "../controllers/stock.controller.js";

const stockRouter = Router();

stockRouter.route('/add/:productId')
    .post(stockController.add);

stockRouter.route('/remove/:productId')
    .post(stockController.remove);

stockRouter.route('/')
    .get(stockController.getAll);

export default stockRouter;