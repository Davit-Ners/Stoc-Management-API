import mailFunctions from "../models/nodemailer.model.js";
import userRepository from "../repositories/user.repository.js";

const authController = {

    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: "Missing credentials" });
            return;
        }

        const user = await userRepository.getByUsername(username.trim());

        if (!user) {
            res.status(400).json({ error: "No user with this username" });
            return;
        }

        if (user.password !== password) {
            res.status(400).json({ error: "Wrong Credentials" });
            return;
        }

        //TODO update lastLogin

        res.sendStatus(200);
    },

    register: async (req, res) => {
        //TODO ONLY ADMIN
        const exist = await userRepository.checkIfEmailUsernameExist(req.data.email, req.data.username);

        if (exist > 0) {
            res.status(409).json({ error: "A user already exist with that credentials" });
            return;
        }

        const user = await userRepository.add(req.data);

        await mailFunctions.sendPasswordEmail(user.email, user.id);

        res.status(201).json(user);
    },

    setPasswordPOST: async (req, res) => {
        //TODO Check password (Strong enough ?)
        const id = parseInt(req.params.id);

        if (isNaN(id) || id < 1) {
            res.status(404).json({ error: 'Bad id parameter' });
            return;
        }
        const password = req.data;

        const user = await userRepository.getById(id);

        console.log(isNaN(user.password));

        if (!user) {
            res.sendStatus(404);
            return;
        }

        if (user.password) {
            res.status(404).json({ error: "Ce lien n'est plus valide" });
            return;
        }

        await userRepository.setPassword(id, password);

        res.sendStatus(200);
    },

    setPasswordGET: async (req, res) => {
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

        res.status(200).json({
            infos: "Copiez collez le lien suivant dans postman avec une requête POST en replacant les '---' par votre mot de passe et de meme dans la confirmation",
            lien: `http://localhost:8080/api/auth/setPassword/${user.id}?password=---&confirmPassword=---`
        });
    }

}

export default authController;