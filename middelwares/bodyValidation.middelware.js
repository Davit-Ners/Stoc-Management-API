export function bodyValidatorMiddelware(schema) {
    return function (req, res, next) {
        if(!req.body) {
            res.status(400).json({ error: 'No request body !'})
            return;
        }

        const { data, success, error } = schema.safeParse(req.body);

        if(!success) {
            res.status(422).json({ error: error.flatten().fieldErrors });
            return;
        }

        req.data = data;

        next();
    }
}