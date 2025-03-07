import { UserDetailDTO } from "../dto/user.dto.js";
import userRepository from "../repositories/user.repository.js";

const userController = {

    getAll: async (req, res) => {
        const users = await userRepository.getAll();
        res.status(200).json(users);
    },

    getById: async (req, res) => {
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

        console.log(user.lastLogin.toString());

        res.status(200).json(new UserDetailDTO(user));
    },

    disable: async (req, res) => {
        //TODO ADMIN ONLY
        const id = parseInt(req.params.id);

        if (isNaN(id) || id < 1) {
            res.status(404).json({ error: 'Bad id parameter' });
            return;
        }

        const user = await userRepository.disable(id);

        if (user[0] === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.sendStatus(200);
    },

    update: async (req, res) => {
        const id = parseInt(req.params.id);
        await userRepository.update(id, req.data);
        res.sendStatus(200);
    }

}

export default userController;