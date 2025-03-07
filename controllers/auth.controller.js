import { decodeJWT, generateJWT } from "../helpers/jwt.helper.js";
import mailFunctions from "../models/nodemailer.model.js";
import userRepository from "../repositories/user.repository.js";
import argon2 from "argon2";

const authController = {

    login: async (req, res) => {
        if (!req.body?.username || !req.body?.password) {
            res.status(400).json({ error: "Missing credentials" });
            return;
        }

        const { username, password } = req.body;

        const user = await userRepository.getByUsername(username.trim());

        if (!user) {
            res.status(400).json({ error: "No user with this username" });
            return;
        }

        if (!await argon2.verify(user.password, password)) {
            res.status(400).json({ error: "Wrong Credentials" });
            return;
        }

        await userRepository.updateLastLogin(user.id);

        const token = await generateJWT(user);
        
        res.status(200).json(token);
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
        //TODO Only THAT user can acces
        const id = parseInt(req.params.id);
        const password = req.data;

        const hashedPassword = await argon2.hash(password);

        await userRepository.setPassword(id, hashedPassword);

        res.sendStatus(200);
    },

    setPasswordGET: async (req, res) => {
        //TODO Only THAT user can acces
        const id = parseInt(req.params.id);

        res.status(200).json({
            infos: "Copiez collez le lien suivant dans postman avec une requête POST en replacant les '---' par votre mot de passe et de meme dans la confirmation",
            lien: `http://localhost:8080/api/auth/setPassword/${id}?password=---&confirmPassword=---`
        });
    }

}

export default authController;