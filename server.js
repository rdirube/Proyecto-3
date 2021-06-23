// NPM y variables a utilizar

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const secretJWT = "trh489fh4w9fhw9FHW8hfw0FGWH0g4434";
const db = require('./database');
const Usuario = require('./database/models/Usuario');
const Platos = require('./database/models/Platos');
const Pedidos = require('./database/models/Pedidos');
const Pedidos_platos = require('./database/models/Pedidos_has_platos');
const Roles = require ('./database/models/Roles');
const { singularize } = require('sequelize/types/lib/utils');

// instancia de Express

const server = express();
const PORT = 3000;
// middlewares
server.use(helmet());
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(
    expressJwt({
      secret: secretJWT,
      algorithms: ["HS256"],
    }).unless({
      path: ["/login","/register"]
    })
  );
  


//====================== MIDDLEWARES======================//


// Validación body login
const validarBodyLogin = (req, res, next) => {
  if (
      !req.body.correo ||
      !req.body.password
  ) {
      res.status(400).json({
          error: "debe loguearse con su correo y contraseña",
      });
  } else {
      next();
  }
};



const verificarLogin = async (req,res,next) => {
  const loginOk = await Usuario.findOne({
      where: {
          correo: req.body.correo,
          password: req.body.password
      }
  });

  if (!loginOk) {
      res.status(400).json({
          error: "Credenciales incorrectas"
      })
  } else {
      next();
  }
};


// Validación body register
const validarBodyRegister = (req, res, next) => {
  if (
      !req.body.nombre ||
      !req.body.correo ||
      !req.body.password
  ) {
      res.status(400).json({
          error: "debe registrarse con los datos completos",
      });
  } else {
      next();
  }
};



// validación de usuario en DB (validar nombre y mail por separado)
const validarUsuarioNombre = async (req, res, next) => {
  const usuarioExistente = await Usuario.findOne({
      where:{
          nombre: req.body.nombre
          }
  });
  if (usuarioExistente) {
      res.status(409).json({ error: `El nombre pertenece a un usuario registrado` });
  } else {
      next();
  }
}


const validarUsuarioCorreo = async (req, res, next) => {
  const usuarioExistente = await Usuario.findOne({
      where:{
          correo: req.body.correo
          }
  });
  if (usuarioExistente) {
      res.status(409).json({ error: `Ya existe una cuenta registrada con ese correo` });
  } else {
      next();
  }
}


const validarPlatosConStock = async (res, res, next) => {
  const platosStock = await Platos.findAll({
    where:{
      activo:si
    }
  })
}



// POST USUARIO (resgistrarse/login)
server.post('/register', validarBodyRegister, validarUsuarioCorreo, validarUsuarioNombre, (req, res) => {
  Usuario.create({
      nombre: req.body.nombre,
      correo: req.body.correo,
      password: req.body.password
  }).then(usuario => {
      res.status(200).json({ usuario });
  }).catch(error => {
      res.status(400).json({ error: error.message });
  });
})




server.post('/login', validarBodyLogin, verificarLogin, (req, res) => {
  const token = jwt.sign(
      {
          nombre: req.body.nombre,
          correo: req.body.correo,
      },
      secretJWT,
      { expiresIn: "60m" }
  );
  res.status(200).json({ token });
});

server.get('/productos', (res, req,)=> {
})




const validarBodyPedido = (req, res, next) => {
  if (
      !req.body.precio_total ||
      !req.body.fecha ||
      !req.body.estado ||
      !req.body.formas_pago ||
      !req.body.usuarios_id 
      
  ) {
      res.status(400).json({
          error: "debe enviar los datos completos de la transacción",
      });
  } else {
      next();
  }
};


const validarplato = async (req, res, next) => {
  const platoExistente = await Platos.findOne({
      where:{
          id: req.body.id,
          nombre: req.body.nombre}
  });
  console.log("================el producto encontrado================");
  console.log(platoExistente);
  if (!platoExistente) {
      res.status(400).json({ error: `El producto no existe para la venta` });
  } else {
      console.log(req.platoExistente);
      next();
  }
}



server.post('/pedidos', validarBodyPedido, validarplato, validarstock, (req, res) => {
  Pedidos.create({
      precio_total: req.valortotal,
      fecha: req.body.fecha,
      estado: req.body.metodo_pago,
      formas_pago: req.body.formas_pago,
      usuarios_id: req.body.usuarios_id
  }).then(usuario => {
      res.json({ usuario })
  }).catch(error => {
      res.status(400).json({ error: error.message });
  });
})

