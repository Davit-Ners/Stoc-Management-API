import { db } from "../models/index.js"

const stockRepository = {

    add: async (productId) => {
        await db.models.Stock.create({ productId });
    },

    addQuantity: async (productId, quantity) => {
        await db.models.Stock.increment('quantity', {
            by: quantity,
            where: {
                productId: productId
            }
        });
    },

    removeQuantity: async (productId, quantity) => {
        await db.models.Stock.decrement('quantity', {
            by: quantity,
            where: {
                productId: productId
            }
        });
    }

}

export default stockRepository;