import userRepository from "../repositories/user.repository.js";

export async function updateUserValidationMiddelware(schema) {
    return async function (req, res, next) {
        
        const id = parseInt(req.params.id);
        
        if (isNaN(id) || id < 1) {
            res.status(404).json({ error: 'Bad id parameter' });
            return;
        }

        const user = await userRepository.getById(id);

        if (!user) {
            res.sendStatus(404);
            return;
        }
        
        if(!req.body) {
            res.status(400).json({ error: 'No request body !'})
            return;
        }

        const { email, role, password, firstname, lastname } = req.body;

        const rawData = {
            username: user.username,
            email: (email) ? email : user.email,
            role: (role) ? role : user.role,
            password: (password) ? password : user.password,
            firstname: (firstname) ? firstname : user.firstname,
            lastname: (lastname) ? lastname : user.lastname
        }

        console.log(rawData);

        const { data, success, error } = schema.safeParse(rawData);

        if(!success) {
            res.status(422).json({ error: error.flatten().fieldErrors });
            return;
        }

        req.data = data;

        next();
    }
}