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
    if (req.session.usu == undefined) {
        //Obtiene el nombre de usuario y lo valida
        console.log("Esto es el cuerpo "+JSON.stringify(req.body));
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
                    req.session.usu = usuario;
                    res.render("inicio", {title:"Carrito", nom:usuario.nom_usu, Productos: result});
                });
            }
            else{
                return res.render("error",{title:"Error al consultar el usuario", descripcion:"Usuario o contraseña incorrectos" });
            }
        });
    }else{
        con.Productos().then(result =>{
            res.render("inicio", {title:"Carrito", nom:req.session.usu, Productos: result});
        });
    }
});

router.get('/inicio',function(req, res){
    console.log("Esta es la sesion del usuario"+req.session.usu);
    con.Productos().then(result =>{
            res.render("inicio", {title:"Carrito", nom:req.session.usu, Productos: result});
        });
});

router.post('/estados',function(req, res){
    console.log("Hola esta es la peticion de aca");
    console.log("Porque esto no esta funcionando");
    console.log("Lo que está aqui " + JSON.stringify(req.body));
    const nombre = req.body.hola;
    console.log("Datos enviados de la peticion ajax" + nombre);
    con.estados(nombre).then( result => {
        console.log("Holi este es el objeto recibido" + JSON.stringify(result));
        res.json(result);
    });
});

router.post('/anadir',function (req, res) {
    console.log("Aqui esta el error" + req.body);
        con.AgregarCarrito(req.body).then(succes => {
        console.log("Se esta enviando esto " + succes);
        if (succes == true)
            res.send(succes);
        res.send("No se encontro ese estado en nuestra base de datos");
    });
});

router.get('/carrito',function(req, res) {
    con.ObtenerProductos().then(localidades=>{
        con.SumaPrecio().then(precio => {
            res.render("Carrito", {title:"Sus productos" , Productos:localidades, Precio:precio});
        });
    });
});

router.get('/compra', function(req, res){
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

router.get('/salir',function (req, res) {
    con.Eliminar().then( ()=>{
        req.session.usuario = null;
        res.sendFile('./index.html', {root: path.join(__dirname, "../public/html")});
    });
});

module.exports = router;
