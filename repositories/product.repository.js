import { db } from "../models/index.js"

const productRepository = {

    getAll: async () => {
        const products = await db.models.Product.findAll({
            attributes: ['id', 'name', 'category']
        });
        return products;
    },

    getById: async (id) => {
        const product = await db.models.Product.findByPk(id);
        return product;
    }

}

export default productRepository;