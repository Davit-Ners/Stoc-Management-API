export function stockId_quantityMiddelware(quantity_0 = false) {
    return function (req, res, next) {
        if(!req.body) {
            res.status(400).json({ error: 'No request body !'})
            return;
        }

        const productId = parseInt(req.params.productId);

        if (isNaN(productId) || productId < 0) {
            res.status(404).json({ error: "Bad parameter id" });
            return;
        }

        const quantity = req.body.quantity;

        if (!quantity_0) {
            if (isNaN(quantity) || quantity < 1) {
                res.status(400).json({ error: "Wrong quantity" });
                return;
            }
    
            next();
        }

        if (isNaN(quantity) || quantity < 0) {
            res.status(400).json({ error: "Quantity cannot be negative" });
            return;
        }

        next();
        
    }
}