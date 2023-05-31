require('dotenv').config()
const {DATABASE_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(DATABASE_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.export = {
    sequelize
}