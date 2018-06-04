USE examen3;
DELIMITER $$

DROP PROCEDURE IF EXISTS getStates$$
DROP PROCEDURE IF EXISTS register$$
DROP PROCEDURE IF EXISTS getColony$$
DROP PROCEDURE IF EXISTS getUserIdStates$$
DROP PROCEDURE IF EXISTS getIDColonyinStates$$
DROP PROCEDURE IF EXISTS getColonyinStates$$
DROP PROCEDURE IF EXISTS setCarrito$$
DROP PROCEDURE IF EXISTS getCarrito$$
DROP PROCEDURE IF EXISTS Suma$$
DROP PROCEDURE IF EXISTS updateInState$$
DROP PROCEDURE IF EXISTS updateinMun$$
DROP FUNCTION IF EXISTS Cambio$$
DROP PROCEDURE IF EXISTS Comparacion$$
DROP PROCEDURE IF EXISTS BorrarCarrito$$
DROP PROCEDURE IF EXISTS OwnLocation$$

CREATE PROCEDURE getStates()
    BEGIN
        SELECT nom_est, img_est FROM estados;
    END$$

CREATE  PROCEDURE register(IN nombre VARCHAR(100), contra VARCHAR(100), dinero INT)
    BEGIN
        INSERT INTO usuario(nom_usu, pass_usu, cash_usu) VALUES(nombre, contra, dinero);
    END$$

CREATE PROCEDURE getColony()
    BEGIN
        SELECT nom_est, img_est FROM municipios;
    END$$

CREATE PROCEDURE getUserIdStates(IN id_est MEDIUMINT)
    BEGIN
        DROP TEMPORARY TABLE IF EXISTS TempuserIDStates;
        CREATE TEMPORARY TABLE TempUserIdIngredients AS (SELECT *FROM estados WHERE id_est = id_est);
    END$$

CREATE PROCEDURE getIDColonyinStates(IN nom_estado VARCHAR(100))
	BEGIN
		DROP TEMPORARY TABLE IF EXISTS TempMuninStateID;
		CREATE TEMPORARY TABLE TempMuninStateID AS
        (SELECT Muni_in_Estado.id_mun FROM Muni_in_Estado INNER JOIN estados ON
        Muni_in_Estado.id_est = estados.id_est WHERE nom_est = nom_estado);
	END$$

CREATE PROCEDURE getColonyinStates(IN nom_estado VARCHAR(100))
	BEGIN
        SELECT nom_mun, pre_mun FROM municipios WHERE id_mun IN(SELECT Muni_in_Estado.id_mun FROM Muni_in_Estado INNER JOIN estados ON Muni_in_Estado.id_est = estados.id_est WHERE nom_est = nom_estado);
	END$$

CREATE PROCEDURE setCarrito(IN nom VARCHAR(100),precio MEDIUMINT, categoria VARCHAR(30),id_id MEDIUMINT)
    BEGIN
        INSERT INTO Carrito VALUES(categoria, nom, precio,id_id);
    END$$

CREATE PROCEDURE getCarrito()
    BEGIN
        SELECT * FROM Carrito;
    END$$
CREATE PROCEDURE Suma()
    BEGIN
        SELECT SUM(pre_loc) AS valor_total FROM Carrito;
    END$$
CREATE PROCEDURE updateInState(IN nombre VARCHAR(100))
    BEGIN
        UPDATE estados SET con_est = 1 WHERE nom_est = nombre;
    END$$
CREATE PROCEDURE updateinMun(IN nombre VARCHAR(100))
    BEGIN
        UPDATE municipios SET con_mun = 1 WHERE nom_mun = nombre;
    END$$
CREATE FUNCTION Cambio(nombre VARCHAR(100) ,id VARCHAR(10)) RETURNS VARCHAR(100)
    BEGIN
        IF id = 'EST' THEN CALL updateInState(nombre);
        RETURN "Todo bien, todo correcto y yo que me alegro";
        ELSEIF id = 'MUN' THEN CALL updateinMun(nombre);
        RETURN "Todo bien, todo correctoasdasd";
        END IF;
    END$$
CREATE PROCEDURE Comparacion(IN dinero INT, nombre VARCHAR(100), id VARCHAR(10))
    BEGIN
        DECLARE total INT;
        SET @total = (SELECT SUM(pre_loc) FROM Carrito);
        IF dinero > total THEN SELECT Cambio(nombre,id);
        END IF;
    END$$
CREATE PROCEDURE BorrarCarrito()
    BEGIN
        DELETE FROM carrito;
    END$$
CREATE PROCEDURE OwnLocation(id_loca VARCHAR(10), id_usuario INT, id_id MEDIUMINT)
    BEGIN
        IF id_loca = "EST" THEN INSERT INTO ownlocation(id_usu,id_est)VALUES
        (id_usuario,id_id);
        ELSEIF id_loca = "MUN" THEN INSERT INTO ownlocation(id_usu,id_mun)VALUES
        (id_usuario,id_id);
        END IF;
    END$$
