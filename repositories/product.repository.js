import { db } from "../models/index.js"

const productRepository = {

    getAll: async () => {
        const products = await db.models.Product.findAll({
            attributes: ['id', 'name', 'category']
        });
        return products;
    }

}

export default productRepository;