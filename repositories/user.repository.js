import { db } from "../models/index.js";

const userRepository = {

    getAll: async () => {
        const users = await db.models.User.findAll({
            attributes: ['id', 'username', 'role']
        });
        return users;
    },

    getById: async (id) => {
        const user = await db.models.User.findByPk(id);
        return user;
    },

    getByUsername: async (username) => {
        const user = await db.models.User.findAll({
            where: {
                username: username
            }
        });

        return user;
    }

}

export default userRepository;