import productRepository from "../repositories/product.repository.js";
import stockRepository from "../repositories/stock.repository.js";
import transactionRepository from "../repositories/transaction.repository.js";

const stockController = {

    add: async (req, res) => {
        const productId = req.params.productId;
        const userId = 1; //TODO -> Modifier ici pour recup userId depuis token

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
        const productId = req.params.productId;
        const userId = 1; //TODO -> Modifier ici pour recup userId depuis token

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
    }

}

export default stockController;