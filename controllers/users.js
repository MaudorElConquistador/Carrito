const path = require('path');
var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const val = require("../controllers/util.js");
const con = require("../database/db.js");
const body_parser = require('body-parser');
const session = require('express-session');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));

/* GET users listing. */
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

router.post('/login', function(req, res) {
    //console.log("Esta es la sesion" + JSON.stringify(req.session));
    if (req.session.nombre == undefined) {
        //Obtiene el nombre de usuario y lo valida
        console.log("Esto es el cuerpo "+req.body);
        const usuario = req.body.nombreusu;
        UsuarioInvalido = val.validateName(usuario);
        if (UsuarioInvalido != false )
            return res.render("error", {title:"Campo invadlido", descripcion:UsuarioInvalido});
        //Obtiene el nombre de usuario y lo valida
        const contrasea = req.body.password;
        ContraseñaInvalida = val.validatePassword(contrasea);
        if (ContraseñaInvalida != false)
            return res.render("error", {title:"Campo invadlido", descripcion:ContraseñaInvalida });
        //Se le pasa como parametros el nombre y la contraseña que estan dentro de req.body
        con.IniciarSesion(req.body).then(result =>{
            if (result.length !=0) {//Se usa para saber si hay un registro, si hay una cuenta te regresa un numero mayor a cero
              console.log("esl sadas "+ JSON.stringify(result[0]));
                id = result[0].id_usu;
                dinero = result[0].cash_usu;
                if (result[0].cash_usu != undefined) {
                    var usuario = result[0];
                    console.log("esto es lo que me devuelve " + JSON.stringify(usuario.nom_usu));
                    localStorage.setItem('Usuario',JSON.stringify(id));
                  }
                con.Productos().then(result =>{
                    req.session.dinero = dinero;
                    req.session.nombre = usuario;
                    req.session.id = id;
                    console.log(req.session.id);
                    res.render("inicio", {title:"Carrito", nom:usuario.nom_usu, Productos: result});
                });
            }
            else{
                return res.render("error",{title:"Error al consultar el usuario", descripcion:"Usuario o contraseña incorrectos" });
            }
        });
    }else{
        con.Productos().then(result =>{
            res.render("inicio", {title:"Carrito", nom:req.session.nombre, Productos: result});
        });
    }

});

router.post('/estados',function(req, res){
    const nombre = req.body.button;
    console.log(nombre);
    con.estados(nombre).then( result => {
        console.log("Esto me devuelve" + JSON.stringify(result));
        return res.render("municipios", {title:"Municipios", Productos:result});
    });
});

router.post('/anadir',function (req, res) {
  console.log("A ver si aparece "+ JSON.stringify(req.body));
    con.ReCarrito(req.body).then(result =>{
        console.log("Esto es lo que me devuelve pero parece que no agarra" + result);
        if (result.length > 2)
            return res.render("error", {title:"Error al agregar carrito", descripcion:"Ya ha agragado ese producto"});
        console.log("Esto es del carrito " + JSON.stringify(req.body));
        con.AgregarCarrito(req.body);
        con.ObtenerProductos().then(result =>{
            if (result.length > 0) {
                con.SumaPrecio().then(succes =>{
                    return res.render("Carrito", {title:"Sus Productos", Productos:result, Precio:succes[0].valor_total, Descripcion:"Holi"});
                });
            }
            else{
                return res.render("Carrito",{title:"Sus Productos", Descripcion:"No tiene ningún producto agragado al carrito", Productos: 2 });
            }
        });
    });
});

router.post('/compra', function(req, res){
  con.SumaPrecio().then(succes =>{
    var suma =succes[0].valor_total;
    var id = localStorage.getItem('Usuario');
    console.log("Esto es del id " + id);
    if (req.session.dinero > suma) {
      con.ObtenerProductos().then(result =>{
        var holi = result
        con.InsertarLocalidad(result, id).then(result =>{
          con.FunCambio(holi).then(result=>{
              con.Eliminar().then(result => {
                res.render("Compra", {title:"Compra realizada con éxito"});
              });
            });
          });
      });
    }
    if (req.session.dinero< suma) {
      res.render("Compra", {title:"No tienes el suficiente dinero"});
    }
  });
});

router.post('Eliminar', function (req,res) {

});

router.post('/logout',function (req, res) {
	req.session.nombre = null;
});

module.exports = router;
