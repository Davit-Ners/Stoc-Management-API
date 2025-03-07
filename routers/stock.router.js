import { Router } from "express";
import stockController from "../controllers/stock.controller.js";

const stockRouter = Router();

stockRouter.route('/add/:productId')
    .post(stockController.add);

export default stockRouter;