import productRepository from "../repositories/product.repository.js";

export async function updateValidationMiddelware(schema) {
    return async function (req, res, next) {
        
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
        
        if(!req.body) {
            res.status(400).json({ error: 'No request body !'})
            return;
        }

        const { name, reference, description, price, category } = req.body;

        const rawData = {
            name: (name) ? name : product.name,
            reference: (reference) ? reference : product.reference,
            description: (description) ? description : product.description,
            price: (price) ? parseInt(price) : parseInt(product.price),
            category: (category) ? category : product.category
        }

        const { data, success, error } = schema.safeParse(rawData);

        if(!success) {
            res.status(422).json({ error: error.flatten().fieldErrors });
            return;
        }

        req.data = data;

        next();
    }
}