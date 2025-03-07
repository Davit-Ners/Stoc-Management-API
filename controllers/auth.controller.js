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
        //TODO ZOD Verification

        console.log(req.data);

        const user = await userRepository.add(req.data);

        res.status(200).json(user);
    }

}

export default authController;