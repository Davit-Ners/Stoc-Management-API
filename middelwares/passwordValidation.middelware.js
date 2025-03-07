import { decodeJWT } from "../helpers/jwt.helper.js";

export async function passwordValidatorMiddelware() {
    return async function (req, res, next) {
        if(!req.query) {
            res.status(400).json({ error: 'No request query !'})
            return;
        }

        const { password, confirmPassword } = req.query;

        if (password !== confirmPassword) {
            res.status(400).json({ error: "Les mots de pass de matchent pas" });
            return;
        }

        if (password.length < 4) { //TODO Ajouter verifs
            res.status(400).json({ error: "Le mot de passe doit faire minimum 4 characteres ..." })
            return;
        }

        if(!req.query.token) {
            res.status(401).json({ error: "Wrong identity" });
            return;
        }

        const token = await decodeJWT(req.query.token);

        if (token === -1) {
            res.sendStatus(401);
            return;
        }

        req.data = password;

        next();
    }
}