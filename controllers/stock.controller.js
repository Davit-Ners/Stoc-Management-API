import { TransactionDTO } from "../dto/transaction.dto.js";
import productRepository from "../repositories/product.repository.js";
import stockRepository from "../repositories/stock.repository.js";
import transactionRepository from "../repositories/transaction.repository.js";

const stockController = {

    add: async (req, res) => {
        const productId = parseInt(req.params.productId);
        const userId = 3; //TODO -> Modifier ici pour recup userId depuis token

        if (isNaN(productId) || productId < 0) {
            res.status(404).json({ error: "Bad parameter id" });
            return;
        }

        const quantity = req.body.quantity;

        if (isNaN(quantity) || quantity < 1) {
            res.status(400).json({ error: "Wrong quantity" });
            return;
        }

        await stockRepository.addQuantity(productId, quantity);

        const transaction = await transactionRepository.add(productId, quantity, 'ADD', userId);

        res.sendStatus(200);
    },

    remove: async (req, res) => {
        const productId = parseInt(req.params.productId);
        const userId = 5; //TODO -> Modifier ici pour recup userId depuis token

        if (isNaN(productId) || productId < 0) {
            res.status(404).json({ error: "Bad parameter id" });
            return;
        }

        const quantity = req.body.quantity;

        if (isNaN(quantity) || quantity < 1) {
            res.status(400).json({ error: "Wrong quantity" });
            return;
        }

        const product = await productRepository.getById(productId);

        if (!product) {
            res.sendStatus(404);
            return;
        }

        if (product.stock.quantity - quantity < 0) {
            res.status(409).json({ error: "Quantity cannot be negative after remove" });
            return;
        }

        await stockRepository.removeQuantity(productId, quantity);

        const transaction = await transactionRepository.add(productId, quantity, 'REMOVE', userId);

        res.sendStatus(200);
    },

    getAll: async (req, res) => {
        const transactions = await transactionRepository.getAll();
        res.status(200).json(transactions.map(t => new TransactionDTO(t)));
    },

    cancel: async (req, res) => {
        const id = req.params.id;

        if (isNaN(id) || id < 0) {
            res.status(404).json({ error: "Bad parameter id" });
            return;
        }

        const transaction = await transactionRepository.getById(id);

        if (!transaction) {
            res.sendStatus(404);
            return;
        }

        await transactionRepository.cancel(id);
        
        if (transaction.type === 'ADD') {
            await stockRepository.removeQuantity(transaction.productId, transaction.quantity);
            res.sendStatus(200);
            return;
        }

        await stockRepository.addQuantity(transaction.productId, transaction.quantity);
        res.sendStatus(200);
    },

    updateStock: async (req, res) => {
        const productId = parseInt(req.params.productId);

        if (isNaN(productId) || productId < 0) {
            res.status(404).json({ error: "Bad parameter id" });
            return;
        }

        const quantity = req.body.quantity;

        if (!quantity || quantity < 0) {
            res.status(400).json({ error: "Quantity cannot be negative" });
            return;
        }

        const check = await stockRepository.updateStock(productId, quantity);

        if (check < 1) {
            res.sendStatus(404);
            return;
        }

        res.sendStatus(200);
    }

}

export default stockController;