/*
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getUsuarios,
  getUserByID,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  actualizarPassword,
} = require("../controllers/usuarios");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "El id es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  getUserByID
);

router.put("/:id", [validarJWT], actualizarUsuario);
router.put("/updp/:id", [validarJWT], actualizarPassword);

router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;
