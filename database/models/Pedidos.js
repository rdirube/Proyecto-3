const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Pedidos extends Model {}
Pedidos.init({
    id: DataTypes.INTEGER,
    precio_total: DataTypes.DOUBLE,
    fecha: DataTypes.DATE,
    estado: DataTypes.ENUM('NUEVO','PREPARANDO','CONFIRMADO','ENVIANDO'),
    formas_pago: DataTypes.ENUM('TC','CASH','PSE','PAYPAL','MP'),
    usuarios_id:DataTypes.STRING,
}, 
{ 
    sequelize,
    modelName: "pedido",
    tableName: "pedidos",
    timestamps: false
})

module.exports = Pedidos;