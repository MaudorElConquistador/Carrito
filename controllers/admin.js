const path = require('path');
var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const val = require("../controllers/util.js");
const con = require("../database/dbAdmin.js");
const body_parser = require('body-parser');
const session = require('express-session');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));

/* GET admin listing. */
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

router.get('/admin', function(req,res){
    res.sendFile("admin.html", {root: path.join(__dirname, "../public/html")})
});

/*Aqui empieza lo del admin*/

router.post('/administrar', function(req,res){
    const nombre = req.body.nombre;
    const contraseña = req.body.password;
    console.log;
    if (nombre != "Mauricio" || contraseña != "administrador") 
        res.render("error",{title:"Erro al ingresar como administrador", descripcion:"usuario o contraseña incorrectos"});
    con.Estados().then(result=>{
        estados = result;
        con.Municipios().then(result => {municipios = result
            con.ConsultaUsuario().then(result => {usuarios = result
                res.render("admin",{title:"Ha iniciado sesión como administrador", Estados:estados, Municipios: municipios, Usuarios:usuarios });
            });
        });    
    });
});
router.post('/DropUsu',function (req,res) {
   console.log(req.body);
   con.Eliminar(req.body).then(result=>{
   }); 
});

module.exports = router;