const { DataTypes } = require("sequelize");
const Statuses = require("./Statuses")

const db = require("../bd/conn");

const Users = db.define("Users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Statuses.hasMany(Users)
Users.belongsTo(Statuses)

module.exports = Users;