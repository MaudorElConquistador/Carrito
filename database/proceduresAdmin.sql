USE examen3;
DELIMITER $$

DROP PROCEDURE IF EXISTS DropUsers $$
DROP PROCEDURE IF EXISTS modifystate$$
DROP PROCEDURE IF EXISTS BeforeDropUser$$
DROP PROCEDURE IF EXISTS DropUsers$$
DROP PROCEDURE IF EXISTS DropStates$$
CREATE PROCEDURE modifystate(IN id_usuario) /*id_usuario corresponde al usuario eliminado*/
    BEGIN
        UPDATE municipios SET con_mun = 0 WHERE id_mun IN(SELECT id_mun FROM ownlocation WHERE id_usu = id_usuario);
        UPDATE estados SET con_est = 0 WHERE id_est IN(SELECT id_est FROM ownlocation WHERE id_usu = id_usuario);
    END$$
CREATE PROCEDURE BeforeDropUser(IN id_usu)
    BEGIN
      CALL modifystate(id_usu);
    END$$

CREATE PROCEDURE DropUsers(IN id INT)
    BEGIN
        CALL BeforeDropUser(id);
        DELETE FROM usuario WHERE id_usu = id;
    END$$
CREATE PROCEDURE DropStates(IN nomest VARCHAR(100))
    BEGIN
        DELETE FROM States WHERE nom_est = nomest;
    END$$
CREATE PROCEDURE BESTBUYSTATES()
    BEGIN
    SELECT id_usu AS usuario, COUNT(*) AS propiedades FROM ownlocation GROUP BY id_usu HAVING estados=(SELECT COUNT(*)max FROM ownlocation GROUP BY id_usu ORDER BY max DESC LIMIT 1);
    END$$
CREATE PROCEDURE BESTBUYSTATES()
    BEGIN
    SELECT id_usu AS usuario, COUNT(*) AS propiedades FROM ownlocation GROUP BY id_usu HAVING estados=(SELECT COUNT(*)max FROM ownlocation GROUP BY id_usu ORDER BY max ASC LIMIT 1);
    END$$


/*hacer procedure que obtenga los id estados y id municipios de la tabla carrito, buscar su id */