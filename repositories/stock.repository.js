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
    },

    updateStock: async (productId, quantity) => {
        const check = await db.models.Stock.update(
            { quantity: quantity },
            {
                where: {
                    productId: productId
                }
            }
        );

        return check;
    }

}

export default stockRepository;