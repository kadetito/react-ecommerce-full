/*
    CATEGORIAS
    ruta: '/api/categorias'
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getCategorias,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

router.get("/", getCategorias);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre de la categoria es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre de la categoria es necesario").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete("/:id", validarJWT, borrarCategoria);

module.exports = router;
