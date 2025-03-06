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

            firstname: {
                type: DataTypes.STRING(50)
            },

            lastname: {
                type: DataTypes.STRING(50)
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: true
            },

            lastLogin: {
                type: DataTypes.DATE
            },

            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }
        },

        {
            tableName: 'user',
            timestamps: false
        }
    );

    return User;
}