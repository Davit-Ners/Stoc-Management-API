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
    }

}

export default authController;