import { DataTypes, Sequelize } from "sequelize";

/**
 * Stock Builder
 * @param {Sequelize} sequelize
 * @returns 
 */

export default function stockModel(sequelize) {
    const Stock = sequelize.define(
        'stock',

        {
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0
                },
                defaultValue: 0
            }
        },

        {
            tableName: 'stock'
        }
    );

    return Stock;
}