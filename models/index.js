import { Sequelize } from "sequelize";

// Const
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

// Initialization of Sequelize
const sequelize = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT
});

export const db = {};
db.sequelize = sequelize;

// Definition des models