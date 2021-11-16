/*
    Direcciones
    ruta: '/api/addresses'
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getDirecciones,
  crearDireccion,
  actualizarDireccion,
  borrarDireccion,
} = require("../controllers/addresses");

const router = Router();

router.get("/:usuario", getDirecciones);

router.post(
  "/:usuario",
  [
    validarJWT,
    check("usuario", "El id usuario debe de ser válido").isMongoId(),
    validarCampos,
  ],
  crearDireccion
);

router.put(
  "/:id",
  [
    validarJWT,

    check("id", "El id debe de ser válido").isMongoId(),
    validarCampos,
  ],
  actualizarDireccion
);

router.delete("/:id", borrarDireccion);

module.exports = router;
