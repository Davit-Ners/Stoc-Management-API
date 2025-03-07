import { db } from "../models/index.js";

const transactionRepository = {

    add: async (productId, quantity, type, responsibleId) => {
        const transaction = await db.models.Transaction.create({ productId: productId, quantity: quantity, type: type, responsibleId: responsibleId });
        return transaction.id;
    },

    getAll: async () => {
        const transactions = await db.models.Transaction.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: [ 'id', 'productId', 'createdAt' ]
        });

        return transactions;
    }

}

export default transactionRepository;