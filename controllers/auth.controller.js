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

        //TODO Send mail for password

        res.status(201).json(user);
    }

}

export default authController;