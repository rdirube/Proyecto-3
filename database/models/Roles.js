const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Roles extends Model {}
Roles.init({
    //id: DataTypes.INTEGER,
    id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
}, 
{ 
    sequelize,
    modelName: "rol",
    tableName: "roles",
    timestamps: false
})

module.exports = Roles;
