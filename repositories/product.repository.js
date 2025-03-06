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
    },

    add: async ({ name, reference, description, price, category }) => {
        const product = db.models.Product.create({ name, reference, description, price, category });
        return product;
    }

}

export default productRepository;