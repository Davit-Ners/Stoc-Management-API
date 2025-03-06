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
        //TODO ONLY ADMIN / MANAGER
        const product = await productRepository.add(req.data);
        res.location(`/api/product/${product.id}`);
        res.status(201).json(product);
    },

    update: async (req, res) => {
        const id = parseInt(req.params.id);
        await productRepository.update(id, req.data);
        res.sendStatus(200);
    },

    addImage: async (req, res) => {
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

        const imagePath = `${req.file.destination}${req.file.filename}`;

        await productRepository.addImage(id, imagePath);
        res.sendStatus(200);
    }
}

export default productController;