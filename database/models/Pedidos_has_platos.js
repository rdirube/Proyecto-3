const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Pedidos_platos extends Model {}
Pedidos_platos.init({
    //id: DataTypes.INTEGER,
    pedidos_id: DataTypes.INTEGER,
    platos_id: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
}, 
{ 
    sequelize,
    modelName: "pedido_plato",
    tableName: "pedidos_platos",
    timestamps: false
})

module.exports = Pedidos_platos;
