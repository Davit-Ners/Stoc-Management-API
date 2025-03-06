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
    }

}

export default userController;