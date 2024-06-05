const { DataTypes } = require("sequelize")

const bd = require("../bd/conn")

const Statuses = bd.define("statuses", {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Statuses;