/*
    favoritos
    ruta: '/api/favoritos'
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getFavoritos,
  getFavoritosById,
  crearFavoritos,
  actualizarFavoritos,
  borrarFavoritos,
  getFavoritoById,
  getFavorito,
} = require("../controllers/favoritos");

const router = Router();

router.get("/", getFavoritos);
router.get("/:url", getFavoritosById);
router.get("/favorito/:user/:articulo", getFavorito);

router.post("/createfavorito", [validarJWT], crearFavoritos);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del artículo es necesario").not().isEmpty(),
    check("categoria", "la categoría id debe de ser válida").isMongoId(),
    validarCampos,
  ],
  actualizarFavoritos
);

router.delete("/:id", borrarFavoritos);

module.exports = router;
