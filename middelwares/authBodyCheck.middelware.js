import userRepository from "../repositories/user.repository.js";

export async function authBodyCheckMiddelware() {
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

        if (user.password) {
            res.status(404).json({ error: "Ce lien n'est plus valide" });
            return;
        }

        next();
    }
}