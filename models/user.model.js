import { DataTypes, ENUM, Sequelize } from "sequelize"

/**
 * User Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function userModel(sequelize) {
    const User = sequelize.define(
        'user',

        {
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },

            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            
            role: {
                type: ENUM(['ADMIN', 'MANAGER', 'EMPLOYE']),
                allowNull: false
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: true
            },

            lastLogin: {
                type: DataTypes.DATE
            }
        },

        {
            tableName: 'user',
            timestamps: false
        }
    );

    return User;
}