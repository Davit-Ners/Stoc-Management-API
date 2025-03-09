import { DataTypes, Sequelize } from "sequelize";

/**
 * Transaction Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function transactioModel(sequelize) {
    const Transaction = sequelize.define(
        'transaction',

        {
            status: {
                type: DataTypes.ENUM(['CANCELED', 'APROVED']),
                allowNull: false,
                defaultValue: 'APROVED'
            },

            type: {
                type: DataTypes.ENUM(['ADD', 'REMOVE']),
                allowNull: false
            },

            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },

        {
            tableName: 'transaction'
        }
    );

    return Transaction;
}