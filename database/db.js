var mysql = require('mysql');
const escape = require("mysql").escape;

var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'holamundo',
   database: 'examen3',
});

con.connect(err => {
    if (err) console.error(err);
    else console.log("Conexión exitosa a la base de datos");
});

module.exports = {
  InsertarUsuario: user => {
    return new Promise((resolve, reject) => {
        con.query("CALL register(?,?,?)", [user.nombreusu, user.password, user.dinero], (err, result) => {
            if (err)
              console.error(err);
            resolve(console.log("Tu gfa"));
        });
    });
  },
  ConsultaUsuario: user =>{
    return new Promise((resolve, reject) => {
      console.log("SE lo estoy pasando "+ user.nombreusu);
        con.query("SELECT nom_usu FROM usuario WHERE nom_usu = ?", [user.nombreusu], (err, result) => {
        if (err)
        var Holi = JSON.stringify(result);
        console.log("Esto papi" + JSON.stringify(result));
        console.log("Nuestro resultado " + result);
        return resolve(JSON.stringify(result));
        });
    });
  },
  IniciarSesion: user =>{
    return new Promise((resolve, reject) => {
        con.query("SELECT *FROM usuario WHERE nom_usu = ? AND pass_usu = ?" , [user.nombreusu, user.password] , (err, result) => {
        if (err)
          console.error(err);
        return resolve(result);
        });
    });
  },
  Productos: e => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM estados",  (err, result) => {
            if (err)
                console.error(err);
            return resolve(result);
        });
    });
  },
  estados: nombre =>{
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM municipios WHERE id_mun IN(SELECT Muni_in_Estado.id_mun FROM Muni_in_Estado INNER JOIN estados ON Muni_in_Estado.id_est = estados.id_est WHERE nom_est = ?)", [nombre],(err, result) => {
            if (err)
                return err;
            return resolve(result);
        });
    });
  },
  AgregarCarrito: nombre =>{
    return new Promise((resolve, reject) => {
      con.query("CALL setCarrito (?,?,?,?)", [nombre.NomLoc, nombre.PreLoc, nombre.Cat, nombre.IdLoc],(err, result) => {
            if (err)
                return err;
            resolve(console.log("Se registró en carrito"));
        });
    });
  },
  ReCarrito: nombre =>{
    return new Promise((resolve, reject) => {
      console.log("Esto es lo que me devuelve "+ nombre);
      con.query("SELECT *FROM Carrito WHERE nom_loc = ?", [nombre.NomLoc], (err, result) => {
            if (err)
                return err;
            console.log("Holi esto es lo que devuelve" + result);
            return resolve(JSON.stringify(result));
        });
    });
  },
  ObtenerProductos: e =>{
    return new Promise((resolve, reject) => {
      con.query("SELECT *FROM Carrito", (err, result) => {
            if (err)
                return err;
            return resolve(result);
        });
    });
  },
  SumaPrecio: e =>{
    return new Promise((resolve, reject) => {
      con.query("CALL Suma" ,(err, result) => {
          if (err)
              return err;
          return resolve(result[0]);
      });
    });
  },
  FunCambio: nombre =>{
    return new Promise((resolve, reject) => {
        nombre.forEach((nombre,i)=>{
          console.log("Estos nombres "+nombre);
          con.query("SELECT Cambio(?,?)",[nombre.nom_loc, nombre.id_loc],(err, result) => {
            if (err)
                return err;
            return resolve(result);
        });
      });
    });
  },
  InsertarLocalidad: (nombre, usuario) =>{
    return new Promise((resolve, reject) => {
        nombre.forEach((nombre)=>{
          console.log("Nombre: " + JSON.stringify(nombre));
          console.log("Usuario " + usuario);
          con.query("CALL OwnLocation(?,?,?)",[nombre.id_loc, usuario, nombre.id_id],(err, result) => {
            if (err)
                return err;
            console.log(result);
            return resolve(console.log(result));
        });
      });
    });
  },
  Eliminar: e =>{
    return new Promise((resolve, reject) => {
      con.query("CALL BorrarCarrito()",(err, result) => {
          if (err)
              return err;
          console.log("Se supone que ya se modifico");
          return resolve(result);
      });
    });
  }
}
