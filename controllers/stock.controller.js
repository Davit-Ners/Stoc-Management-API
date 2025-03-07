import stockRepository from "../repositories/stock.repository.js";

const stockController = {

    add: async (req, res) => {
        const productId = req.params.productId;

        if (isNaN(productId) || productId < 0) {
            res.status(404).json({ error: "Bad parameter id" });
            return;
        }

        const quantity = req.body.quantity;

        if (isNaN(quantity) || quantity < 1) {
            res.status(400).json({ error: "Wrong quantity" });
            return;
        }

        await stockRepository.updateQuantity(productId, quantity);

        res.sendStatus(200);
    }

}

export default stockController;