import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import productModel from "./product.model.js";
import stockModel from "./stock.model.js";
import transactioModel from "./transaction.model.js";

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
const models = {
    User: userModel(sequelize),
    Product: productModel(sequelize),
    Stock: stockModel(sequelize),
    Transaction: transactioModel(sequelize)
};

// Definition des relations
const { User, Product, Stock, Transaction } = models;

Product.hasOne(Stock, { foreignKey: "productId", as: "stock" });
Stock.belongsTo(Product, { foreignKey: "productId", as: "stock" });

Product.hasMany(Transaction, { foreignKey: "productId", as: "transactions" });
Transaction.belongsTo(Product, { foreignKey: "productId" });

User.hasMany(Transaction, { foreignKey: "responsibleId", as: "transactions" });
Transaction.belongsTo(User, { foreignKey: "responsibleId", as: "responsible" });

const connectDB = async () => {
    try {
        await db.sequelize.authenticate();

        console.log('Connection DB - Succes !');
    }
    catch (err) {
        console.log('Connection DB - Fail !');
        console.log(err);
        process.exit();
    }

    if (process.env.NODE_ENV === 'dev') {
        await db.sequelize.sync({
            alter: true
        });
    }
};

db.connectDB = connectDB;
db.models = models;

export default { db };