/*
    Articulos
    ruta: '/api/articulos'
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getArticulos,
  crearArticulo,
  actualizarArticulo,
  borrarArticulo,
} = require("../controllers/articulos");

const router = Router();

router.get("/", getArticulos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del artículo es necesario").not().isEmpty(),
    check("categoria", "la categoría id debe de ser válida").isMongoId(),
    validarCampos,
  ],
  crearArticulo
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del artículo es necesario").not().isEmpty(),
    check("categoria", "la categoría id debe de ser válida").isMongoId(),
    validarCampos,
  ],
  actualizarArticulo
);

router.delete("/:id", borrarArticulo);

module.exports = router;
