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
	/*Hay que ponerle la funcionalidad*/
  InsertarEstado: user => {
    return new Promise((resolve, reject) => {
        con.query("CALL register(?,?,?)", [user.nombreusu, user.password, user.dinero], (err, result) => {
            if (err)
              console.error(err);
            resolve(console.log("Tu gfa"));
        });
    });
  },
  	/*Hay que ponerle la funcionalidad*/
  InsertarMunicipio: user => {
    return new Promise((resolve, reject) => {
        con.query("INSERT INTO (?,?,?)", [user.nombreusu, user.password, user.dinero], (err, result) => {
            if (err)
              console.error(err);
            resolve(console.log("Tu gfa"));
        });
    });
  },
  ConsultaUsuario: user =>{
    return new Promise((resolve, reject) => {
        con.query("SELECT *FROM usuario ", (err, result) => {
        if (err)
        	return err;
        return resolve(result);
        });
    });
  },
  Estados: e => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM estados",  (err, result) => {
            if (err)
                console.error(err);
            return resolve(result);
        });
    });
  },
  Municipios: nombre =>{
    return new Promise((resolve, reject) => {
        con.query("SELECT *FROM municipios",(err, result) => {
            if (err)
                return err;
            console.log(result)
            return resolve(result);
        });
    });
  },
  EliminarEstado: nombre =>{
    return new Promise((resolve, reject) => {
      con.query("CALL DropStates(?)",[nombre.id],(err, result) => {
          if (err)
              return err;
          console.log("Se supone que ya se modifico");
          return resolve(result);
      });
    });
  },
  Eliminar: nombre =>{
    return new Promise((resolve, reject) => {
      con.query("CALL DropUsers(?)",[nombre.id],(err, result) => {
          if (err)
              return err;
          console.log("Se supone que ya se modifico");
          return resolve(result);
      });
    });
  }
}
