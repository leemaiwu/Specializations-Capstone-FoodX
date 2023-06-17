const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Ingredients: sequelize.define('ingredients', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ingredients: DataTypes.STRING
    })
}
