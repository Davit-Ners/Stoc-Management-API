import { db } from "../models/index.js";

const transactionRepository = {

    add: async (productId, quantity, type, responsibleId) => {
        const transaction = await db.models.Transaction.create({ productId: productId, quantity: quantity, type: type, responsibleId: responsibleId });
        return transaction.id;
    }

}

export default transactionRepository;