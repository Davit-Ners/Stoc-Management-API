import { db } from "../models/index.js";
import { Op } from "sequelize";

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
    },

    checkIfEmailUsernameExist: async (email, username) => {
        const userCount = await db.models.User.count({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        return userCount;
    },

    add: async ({ username, email, firstname = "", lastname = "", role }) => {
        const user = await db.models.User.create({ 
            username: username, 
            email: email, 
            role: role, 
            firstname: firstname, 
            lastname: lastname 
        });

        return user;
    }



}

export default userRepository;