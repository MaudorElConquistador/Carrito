const path = require('path');
var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const val = require("../controllers/util.js");
const con = require("../database/db.js");
const body_parser = require('body-parser');
const session = require('express-session');
const users = require('./users.js');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));

/* GET home page. */
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

router.get('/', function(req, res) {
    res.sendFile("index.html", {root: path.join(__dirname, "../public/html")});
});

router.post('/register', function(req, res) {
    console.log(req.body);

    const usuario = req.body.nombreusu;
    UsuarioInvalido = val.validateName(usuario);
    if (UsuarioInvalido != false )
        return res.render("error", {title:"Error al registrar su nombre de usuario", descripcion:UsuarioInvalido});

    const contrasea = req.body.password;
    ContraseñaInvalida = val.validateName(contrasea);
    if (ContraseñaInvalida != false)
        return res.render("error", {title:"Error al registrar su contraseña", descripcion:ContraseñaInvalida});

    const dinero = req.body.dinero;
    Dineroinvalido = val.validateName(contrasea);
    if (Dineroinvalido != false)
        return res.render("error", {title:"Error al registrar su contraseña", descripcion:Dineroinvalido});

    con.ConsultaUsuario(req.body).then(result =>{
      console.log("Este es el resultado " + result);
        if (result.length > 2) {
            return res.render("error",{title:"Error al registrar el usuario", descripcion:"Ese usuario ya ha sido registrado"});
        }
        else{
            con.InsertarUsuario(req.body);
            con.ConsultaUsuario(req.body).then(result =>{});
            con.Productos().then(result =>{
              localStorage.setItem('Usuario', JSON.stringify(req.body));
                req.session.nombre = usuario;
                console.log(result);
                console.log(result[0]);
                res.render("inicio", {title:"Carrito", nom:usuario, Productos: result});
            });
        }
    });
});

router.use(/^\/users/, users);

module.exports = router;
