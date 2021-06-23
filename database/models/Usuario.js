const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Usuario extends Model {}
Usuario.init({
    //id: DataTypes.INTEGER,
    id: DataTypes.INTEGER,
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING
}, 
{ 
    sequelize,
    modelName: "usuario",
    tableName: "usuarios",
    timestamps: false
})

module.exports = Usuario;
