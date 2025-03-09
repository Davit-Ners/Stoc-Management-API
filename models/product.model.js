import { DataTypes, Sequelize } from "sequelize";

/**
 * Product Builder
 * @param {Sequelize} sequelize
 * @returns 
 */

export default function productModel(sequelize) {
    const Product = sequelize.define(
        'product',
        
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },

            reference: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            
            description: {
                type: DataTypes.STRING(1000)
            },

            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    min: 0
                }
            },

            category: {
                type: DataTypes.STRING(50),
                allowNull: false
            },

            imagePath: {
                type: DataTypes.STRING(500),
                unique: true
            }
        },

        {
            tableName: 'product',
            timestamps: false
        }
    );

    return Product;
}