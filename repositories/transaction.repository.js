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
            include: {
                model: db.models.User,
                as: 'responsible',
                required: true,
                attributes: ['username', 'id']
            }
        });

        return transactions;
    },

    getById: async (id) => {
        const transaction = await db.models.Transaction.findByPk(id);
        return transaction;
    },

    cancel: async (id) => {
        const modif = await db.models.Transaction.update(
            { status: 'CANCELED' },
            {
                where: {
                    id: id
                }
            }
        );

        return modif;
    }

}

export default transactionRepository;