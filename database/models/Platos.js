const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Platos extends Model {}
Platos.init({
    //id: DataTypes.INTEGER,
    id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    precio:DataTypes.DOUBLE,
    activo: DataTypes.TINYINT,
    imagen: DataTypes.STRING,
}, 
{ 
    sequelize,
    modelName: "plato",
    tableName: "platos",
    timestamps: false
})

module.exports = Platos;