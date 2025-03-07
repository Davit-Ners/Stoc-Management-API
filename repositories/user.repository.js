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

        return user[0];
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
    },

    disable: async (id) => {
        return await db.models.User.update(
            {isActive: false},
            {
                where: {
                    id: id
                }
            }
        );
    },

    update: async (id, { email, role, password, firstname, lastname }) => {
        await db.models.User.update(
            { email, role, password, firstname, lastname },
            {
                where: {
                    id: id
                }
            }
        );
    },

    setPassword: async (id, password) => {
        await db.models.User.update(
            { password },
            {
                where: {
                    id: id
                }
            }
        );
    }



}

export default userRepository;