"use strict";

var conn = require("../db-connection"),
  LibroMayorModel = () => {};

LibroMayorModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_libro_mayor()", cb);

LibroMayorModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_libro_mayor WHERE id_libro_mayor = $1 ", [cod], cb);

LibroMayorModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_libro_mayor WHERE id_libro_mayor = $1",
    [data.id_libro_mayor],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { //MODIFICAR
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_articulo_update ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
              [
                data.cod_articulo,
                data.tipo,
                data.descripcion,
                data.descripcion_corta,
                data.id_impuesto,
                data.id_categoria,
                data.precio,
                data.id_unidad_venta,
                data.id_socio_negocio,
                data.id_unidad_compra,
                data.codigo_barra,
                data.id_unidad_medida,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query( //MODIFICAR
              "call prc_articulo_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
              [
                data.cod_articulo,
                data.tipo,
                data.descripcion,
                data.descripcion_corta,
                data.id_impuesto,
                data.id_categoria,
                data.precio,
                data.id_unidad_venta,
                data.id_socio_negocio,
                data.id_unidad_compra,
                data.codigo_barra,
                data.id_unidad_medida,
                data.activo,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

LibroMayorModel.delete = (cod, cb) => //MODIFICAR
  conn.query("call prc_articulo_delete ($1)", [cod], cb);

module.exports = LibroMayorModel;