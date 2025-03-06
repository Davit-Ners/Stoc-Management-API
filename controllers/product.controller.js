import { ProductDetailDTO, ProductDTO } from "../dto/product.dto.js";
import productRepository from "../repositories/product.repository.js"

const productController = {
    getAll: async (req, res) => {
        const rawProducts = await productRepository.getAll();
        const products = rawProducts.map(p => new ProductDTO(p));
        res.status(200).json(products);
    },

    getById: async (req, res) => {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id < 1) {
            res.status(404).json({ error: 'Bad id parameter' });
            return;
        }

        const product = await productRepository.getById(id);

        if (!product) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(new ProductDetailDTO(product));
    },

    add: async (req, res) => {
        //TODO verification body data with Zod & middelware
        const product = await productRepository.add(req.body);
        res.status(200).json(product);
    }
}

export default productController;