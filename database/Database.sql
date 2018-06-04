DROP DATABASE IF EXISTS examen3;
CREATE DATABASE examen3 DEFAULT CHARACTER SET utf8;
USE examen3;

CREATE TABLE usuario(
	id_usu MEDIUMINT AUTO_INCREMENT,
	nom_usu VARCHAR(100) NOT NULL,
	pass_usu VARCHAR(100) NOT NULL,
	cash_usu INT NOT NULL,
  	PRIMARY KEY (id_usu)
);
CREATE TABLE admin(
  id_adm MEDIUMINT AUTO_INCREMENT,
  nom_adm VARCHAR(100) NOT NULL,
  pass_adm VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_adm)
);
CREATE TABLE estados(
  id_est MEDIUMINT AUTO_INCREMENT,
  nom_est varchar(100) NOT NULL,
  pre_est MEDIUMINT NOT NULL,
  con_est TINYINT(2) DEFAULT '0',
  category VARCHAR(10) DEFAULT "EST",
  img_est varchar(200) DEFAULT '/img/ingredients/no_image.png',
  PRIMARY KEY (id_est)
);
CREATE TABLE municipios(
	   id_mun  MEDIUMINT AUTO_INCREMENT,
	   nom_mun varchar(100) NOT NULL,
	   pre_mun MEDIUMINT NOT NULL,
	   con_mun TINYINT(2) DEFAULT '0',
	   category VARCHAR(10) DEFAULT "MUN",
	   img_mun varchar(200) DEFAULT '/img/ingredients/no_image.png',
	   PRIMARY KEY (id_mun)
);
CREATE TABLE Muni_in_Estado(
	   id_mun_es MEDIUMINT AUTO_INCREMENT,
	   id_est MEDIUMINT NOT NULL,
	   id_mun MEDIUMINT NOT NULL,
	   PRIMARY KEY (id_mun_es),
	   FOREIGN KEY (id_est)REFERENCES Estados(id_est) ON DELETE CASCADE,
	   FOREIGN KEY (id_mun)REFERENCES Municipios(id_mun) ON DELETE CASCADE
);
CREATE TABLE carrito(
		id_loc VARCHAR(10) DEFAULT NULL,
		nom_loc VARCHAR(100) NOT NULL,
		pre_loc MEDIUMINT NOT NULL,
		id_id  MEDIUMINT NOT NULL
);
CREATE TABLE ownlocation(
		id_own MEDIUMINT(10) AUTO_INCREMENT,
		id_usu MEDIUMINT NOT NULL,
		id_est MEDIUMINT DEFAULT NULL UNIQUE,
		id_mun MEDIUMINT DEFAULT NULL UNIQUE,
		PRIMARY KEY(id_own),
		FOREIGN KEY(id_usu)REFERENCES usuario(id_usu) ON DELETE CASCADE,
		FOREIGN KEY(id_est)REFERENCES Estados(id_est) ON DELETE CASCADE,
		FOREIGN KEY(id_mun)REFERENCES Municipios(id_mun) ON DELETE CASCADE
);
INSERT INTO usuario(nom_usu,pass_usu,cash_usu)VALUES
("Maudor","cacaverde",232323),
("calamardito","elegante",232323),
("elsuciodan","cacaverde",232323);

INSERT INTO Estados(nom_est,pre_est,img_est)VALUES
("Buenos Aires",55729, "/img/ingredients/no_image.png" ),
("Catamarca",20098,"/img/ingredients/no_image.png"),
("Chaco",23233, "/img/ingredients/no_image.png"),
("Chubut",45454,"/img/ingredients/no_image.png"),
("Córdoba",67897,"/img/ingredients/no_image.png"),
("Corrientes",34545,"/img/ingredients/no_image.png"),
("Entre Rios",34334,"/img/ingredients/no_image.png"),
("Formosa",23232,"/img/ingredients/no_image.png"),
("Jujuy",32223,"/img/ingredients/no_image.png"),
("La Pampa",23233,"/img/ingredients/no_image.png"),
("La Rioja",32446,"/img/ingredients/no_image.png"),
("Mendoza",32232,"/img/ingredients/no_image.png"),
("Misiones",23232,"/img/ingredients/no_image.png"),
("Neuquén",65655,"/img/ingredients/no_image.png"),
("Rio Negro",23223,"/img/ingredients/no_image.png"),
("Salta",78877,"/img/ingredients/no_image.png"),
("San Juan",67887,"/img/ingredients/no_image.png"),
("San Luis",32323,"/img/ingredients/no_image.png"),
("Santa Cruz",67856,"/img/ingredients/no_image.png"),
("Santa Fe",78798,"/img/ingredients/no_image.png"),
("Santiago del Estero",23233,"/img/ingredients/no_image.png"),
("Tierra del Fuego, Antártida e Islas del Atlántico Sur",23233,"/img/ingredients/no_image.png"),
("Tucumán",52365,"/img/ingredients/no_image.png");

INSERT INTO Municipios(nom_mun,pre_mun,img_mun)VALUES
("Adolfo Alsina",7899,"/img/ingredients/no_image.png"),
("Adolfo Gonzales Chaves",2343,"/img/ingredients/no_image.png"),
("Alberti",2343,"/img/ingredients/no_image.png"),
("Aconquija",5687,"/img/ingredients/no_image.png"),
("Ancasti",3423,"/img/ingredients/no_image.png"),
("Belen",6474,"/img/ingredients/no_image.png"),
("Barranqueras",8695,"/img/ingredients/no_image.png"),
("Charata",8695,"/img/ingredients/no_image.png"),
("fontana",6574,"/img/ingredients/no_image.png"),
("Trelew",8796,"/img/ingredients/no_image.png"),
("Esquel",9807,"/img/ingredients/no_image.png"),
("Puerto Madryn",8796,"/img/ingredients/no_image.png"),
("Monteria",9786,"/img/ingredients/no_image.png"),
("Ayapel",6578,"/img/ingredients/no_image.png"),
("Buena Vista",3452,"/img/ingredients/no_image.png"),
("Riachuelo",5436,"/img/ingredients/no_image.png"),
("Pueblo libertador",1324,"/img/ingredients/no_image.png"),
("Ramada Paso",5467,"/img/ingredients/no_image.png"),
("Cañuelas",4567,"/img/ingredients/no_image.png"),
("Bernardi",1425,"/img/ingredients/no_image.png"),
("Crespo",6574,"/img/ingredients/no_image.png"),
("Diamante Tejedor",6745,"/img/ingredients/no_image.png"),
("Laguna Llena",1425,"/img/ingredients/no_image.png"),
("Nike Neick",6574,"/img/ingredients/no_image.png"),
("Vicente Villafañe",6745,"/img/ingredients/no_image.png"),
("Abra Pampa",5743,"/img/ingredients/no_image.png"),
("Caimancito",6347,"/img/ingredients/no_image.png"),
("Abramo",6783,"/img/ingredients/no_image.png"),
("Alpachiri",4678,"/img/ingredients/no_image.png"),
("Alta Italia",2310,"/img/ingredients/no_image.png"),
("Abalos",4534,"/img/ingredients/no_image.png"),
("Agoncillo",6745,"/img/ingredients/no_image.png"),
("Albelda de iragua",6764,"/img/ingredients/no_image.png"),
("General Alvear",7767,"/img/ingredients/no_image.png"),
("General San Martin",4534,"/img/ingredients/no_image.png"),
("Godoy Cruz",3733,"/img/ingredients/no_image.png"),
("Azara",5733,"/img/ingredients/no_image.png"),
("Bondpland",4733,"/img/ingredients/no_image.png"),
("Arroyo del medio",2743,"/img/ingredients/no_image.png"),
("Senillosa",2173,"/img/ingredients/no_image.png"),
("Villa la angustura",3733,"/img/ingredients/no_image.png"),
("San Martín de los Andes",3733,"/img/ingredients/no_image.png"),
("Cinco saltos",3333,"/img/ingredients/no_image.png"),
("Comallo",3733,"/img/ingredients/no_image.png"),
("Choele Choel",3733,"/img/ingredients/no_image.png"),
("Rosario de Lema",4733,"/img/ingredients/no_image.png"),
("Salta",3733,"/img/ingredients/no_image.png"),
("San José de Metán",3733,"/img/ingredients/no_image.png"),
("Caucete",1433,"/img/ingredients/no_image.png"),
("Chimbas",2738,"/img/ingredients/no_image.png"),
("Pocito",3533,"/img/ingredients/no_image.png"),
("Santa Rosa de Conlara",5733,"/img/ingredients/no_image.png"),
("Tilisarao",1733,"/img/ingredients/no_image.png"),
("Unión",3733,"/img/ingredients/no_image.png"),
("Corpen aike",8999,"/img/ingredients/no_image.png"),
("Deseado",7654,"/img/ingredients/no_image.png"),
("Lago argentino",9786,"/img/ingredients/no_image.png"),
("Casilda",4733,"/img/ingredients/no_image.png"),
("Cañada de Gomez",3633,"/img/ingredients/no_image.png"),
("Capitan Bermudez",3533,"/img/ingredients/no_image.png"),
("Frías",3743,"/img/ingredients/no_image.png"),
("La Banda",4733,"/img/ingredients/no_image.png"),
("Campo Gallo",4777,"/img/ingredients/no_image.png"),
("Rio Grande",6773,"/img/ingredients/no_image.png"),
("Tolhuin",2733,"/img/ingredients/no_image.png"),
("Atlántica argentina",5763,"/img/ingredients/no_image.png"),
("Juan Bautista Alberdi",4723,"/img/ingredients/no_image.png"),
("Talitas",2987,"/img/ingredients/no_image.png"),
("San isidro de Lules",4633,"/img/ingredients/no_image.png");

INSERT INTO Muni_in_Estado(id_est,id_mun)VALUES
(1,1),
(1,2),
(1,3),
(2,4),
(2,5),
(2,6),
(3,7),
(3,8),
(3,9),
(4,10),
(4,11),
(4,12),
(5,13),
(5,14),
(5,15),
(6,16),
(6,17),
(6,18),
(7,19),
(7,20),
(7,21),
(8,22),
(8,23),
(8,24),
(9,25),
(9,26),
(9,27),
(10,28),
(10,29),
(10,30),
(11,31),
(11,32),
(11,33),
(12,34),
(12,35),
(12,36),
(13,37),
(13,38),
(13,39),
(14,40),
(14,41),
(14,42),
(15,42),
(15,44),
(15,45),
(16,46),
(16,47),
(16,48),
(17,49),
(17,50),
(17,51),
(18,52),
(18,53),
(18,54),
(19,55),
(19,56),
(19,57),
(20,58),
(20,59),
(20,60),
(21,61),
(21,62),
(21,63),
(22,64),
(22,65),
(22,66),
(23,67),
(23,68),
(23,69);