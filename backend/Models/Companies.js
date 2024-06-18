const { DataTypes } = require("sequelize");
const Costumers = require("./Costumers");
const Statuses = require("./Statuses");

const db = require("../bd/conn");

const Companies = db.define("Company", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Costumers.hasMany(Companies);
Companies.belongsTo(Costumers, {
    constraints: true
});
Statuses.hasMany(Companies);
Companies.belongsTo(Statuses, {
    constraints: true
});

module.exports = Companies;