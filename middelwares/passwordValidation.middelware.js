export function passwordValidatorMiddelware() {
    return function (req, res, next) {
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
        }

        req.data = password;

        next();
    }
}