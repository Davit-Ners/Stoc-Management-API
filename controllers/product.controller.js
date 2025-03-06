import productRepository from "../repositories/product.repository.js"

const productController = {
    getAll: async (req, res) => {
        const products = await productRepository.getAll();
        res.status(200).json(products);
    }
}

export default productController;