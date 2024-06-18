const { DataTypes } = require("sequelize");
const Statuses = require("./Statuses");

const db = require("../bd/conn");

const Costumers = db.define("Costumers", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Statuses.hasMany(Costumers)
Costumers.belongsTo(Statuses, {
    constraints: true,
})

module.exports = Costumers;