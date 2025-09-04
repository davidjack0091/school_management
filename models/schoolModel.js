const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const School = sequelize.define('School', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
})

module.exports = School
