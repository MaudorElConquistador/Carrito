var mysql = require('mysql');
const escape = require("mysql").escape;

var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'holamundo',
   database: 'examen3',
});

module.exports = {
	BuscarLocalidad: nombre => {
		if (nombre.cat == "EST") {
			con.query("CALL searchState (?)", [nombre.nom],(err, result) =>{
				if (err);
					return false;
				console.log("Hola (17) db validacion resultado" +JSON.stringify(result));	
				return true;
			});
		}

		if (nombre.cat == "MUN") {
			con.query("CALL searchColony(?)", [nombre.nom],(err, result) =>{
				if (err);
					return false;
				console.log("El resultado de la busqueda erronea " + JSON.stringify(result));
				return true;
			});		
		}	

		if (nombre.cat != "MUN" || nombre.cat != "EST") {
			return false;
		return true;
		}
	},
	FunPrueba: e => {
		return "Hola";
	}
};